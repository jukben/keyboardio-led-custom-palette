import React from "react";
import SerialPort from "serialport";
import { fromEvent, never, periodic, of } from "most";
import { evolve, always, clamp, equals, adjust, T } from "ramda";
import {
  getRGBArrayFromPalette,
  getPaletteFromRGBArray,
  getLayoutsFromArray,
  getLayouts
} from "../common/utils";
import Loader from "./Loader";

// http://alumni.media.mit.edu/~wad/color/palette.html
const DEFAULT_PALETTE = [
  [0, 0, 0],
  [87, 87, 87],
  [173, 35, 35],
  [42, 75, 215],
  [129, 74, 25],
  [129, 38, 192],
  [160, 160, 160],
  [129, 197, 122],
  [157, 175, 255],
  [41, 208, 208],
  [255, 146, 51],
  [255, 238, 51],
  [233, 222, 187],
  [255, 205, 243],
  [29, 105, 20],
  [255, 255, 255]
];

const DEFAULT_STATE = {
  palette: null,
  layouts: null,
  numberOfLayouts: 1,
  activeLayoutIndex: 0,
  activeColorIndex: 0,
  fatalError: false,
  inSync: { status: false, error: true }
};

const Store = React.createContext(DEFAULT_STATE);

// eslint-disable-next-line
export const Consumer = Store.Consumer;

export const SERIAL_OK = ".";

export const ERROR = {
  RECOVER: "RECOVER",
  FATAL: "ERROR_FATAL"
};

export default class Provider extends React.Component {
  port = null;

  data$ = never();

  palette = [];

  layouts = [];

  reconnect$ = periodic(3000).observe(async () => {
    const {
      inSync: { error },
      fatalError
    } = this.state;

    // do not reconnect if are not facing any error.. or if error is fatal
    if (!error || fatalError) return;

    console.log("Trying to reconnect...");
    this.connect();
  });

  state = DEFAULT_STATE;

  componentWillUnmount() {
    this.closeSerial();
  }

  async getData() {
    let palette;
    let layouts;
    try {
      palette = getRGBArrayFromPalette(await this.sendCommand("palette", true));
      layouts = getLayouts(await this.sendCommand("colormap.map", true));
    } catch (e) {
      this.errorReducer(e);
      return;
    }

    this.palette = palette;
    this.layouts = layouts;

    this.setState({
      numberOfLayouts: layouts.length,
      palette,
      layouts,
      fatalError: false,
      inSync: {
        status: true,
        error: false
      }
    });
  }

  errorReducer = e => {
    switch (e) {
      case ERROR.FATAL:
        this.setState(
          evolve({
            fatalError: T,
            inSync: {
              error: T
            }
          })
        );
        this.closeSerial();
        break;
      default:
        this.setState(
          evolve({
            inSync: {
              error: T
            }
          })
        );
    }
  };

  setLayer = layerId => {
    const { layouts } = this.state;

    this.setState({
      activeLayoutIndex: clamp(0, layouts.length - 1, layerId)
    });
  };

  isInSync = (updateState = true) => {
    const { palette, layouts } = this.state;
    const paletteEquals = equals(this.palette, palette);
    const layoutsEquals = equals(this.layouts, layouts);

    if (updateState) {
      this.setState(
        evolve({
          inSync: {
            status: always(paletteEquals && layoutsEquals)
          }
        })
      );
    }

    return {
      paletteEquals,
      layoutsEquals
    };
  };

  setColorPalette = (id, color) => {
    this.setState(
      evolve({
        palette: adjust(always(color), id),
        activeColorIndex: always(id)
      }),
      this.isInSync
    );
  };

  resetPalette = () => {
    this.setState(
      evolve({
        palette: always(DEFAULT_PALETTE)
      }),
      this.isInSync
    );
  };

  setKeyColor = keyId => {
    const { activeColorIndex, activeLayoutIndex } = this.state;

    this.setState(
      evolve({
        layouts: adjust(
          adjust(always(activeColorIndex), keyId),
          activeLayoutIndex
        )
      }),
      this.isInSync
    );
  };

  setColorIndexActive = color => {
    this.setState({
      activeColorIndex: color
    });
  };

  syncKeyboard = async () => {
    console.log("Attempt to sync the keyboard...");
    const { palette, layouts, activeLayoutIndex } = this.state;

    if (!palette || !layouts) {
      throw new Error("[syncKeyboard] Doesn't have a data to synchronize");
    }

    const { layoutsEquals, paletteEquals } = this.isInSync(false);

    try {
      if (!paletteEquals) {
        console.log("...palette sync...");
        await this.sendCommand(`palette ${getPaletteFromRGBArray(palette)}`);
      }

      if (!layoutsEquals) {
        console.log("...layout sync...");
        await this.sendCommand(`colormap.map ${getLayoutsFromArray(layouts)}`);
        // hacky way how to repain the keyboard
        await this.sendCommand(`colormap.layer ${activeLayoutIndex}`);
      }
    } catch (e) {
      this.errorReducer(e);
      console.error(`[syncKeyboard] Error in synchronization: ${e}`);
      return;
    }

    console.log("...sync OK");

    this.palette = palette;
    this.layouts = layouts;

    this.setState({
      inSync: {
        status: true,
        error: false
      }
    });
  };

  closeSerial = () => {
    this.port.close();
  };

  createSerial(com) {
    // eslint-disable-next-line
    const Readline = SerialPort.parsers.Readline;

    this.port = new SerialPort(
      com,
      {
        lock: false
      },
      async e => {
        if (e instanceof Error) {
          console.error(e);
          this.setState({
            fatalError: true
          });
          return;
        }

        await this.getData();
        console.log("Connected!");
      }
    );

    const parser = this.port.pipe(new Readline());

    const on$ = fromEvent("data", parser);
    const error$ = fromEvent("error", parser);

    this.data$ = on$.until(error$);
  }

  async sendCommand(command, reply = false) {
    if (!command) {
      throw new Error("Serial communication fatal error, command is missing");
    }

    if (!this.port) {
      throw new Error("Serial communication is not established");
    }

    this.port.write(`${command}\n`);

    return new Promise((res, rej) => {
      this.data$
        .take(1)
        .takeUntil(of().delay(3000))
        .subscribe({
          next: message => {
            if (message.trim() === SERIAL_OK) {
              if (reply) {
                return rej(ERROR.FATAL);
              }
              return res(SERIAL_OK);
            }

            return res(message);
          },
          error: e => {
            console.error("[sendCommand] error", e);
            return rej(ERROR.FATAL);
          },
          complete: () => {
            rej(ERROR.RECOVER);
          }
        });
    });
  }

  async connect() {
    let serials = [];
    try {
      serials = await SerialPort.list();
    } catch (e) {
      console.error("[connect] cannot list all serials");
    }

    const keyboard = serials.filter(
      ({ manufacturer, serialNumber = "" }) =>
        manufacturer === "Keyboardio" || serialNumber.match(/kbio/)
    )[0];

    if (!keyboard) {
      return;
    }

    const { comName } = keyboard;

    try {
      this.createSerial(comName);
    } catch (e) {
      console.error("[connect] cannot establish a serial");
      this.setState({
        fatalError: true
      });
    }
  }

  render() {
    const {
      palette,
      layouts,
      inSync,
      fatalError,
      activeLayoutIndex,
      activeColorIndex,
      numberOfLayouts
    } = this.state;

    const configurationLoaded = palette && layouts;

    const { children } = this.props;

    return (
      <>
        {!configurationLoaded && (
          <div>
            <Loader fatalError={fatalError} />
          </div>
        )}
        {configurationLoaded && (
          <Store.Provider
            value={{
              palette,
              layouts,
              inSync,
              fatalError,
              activeLayoutIndex,
              activeColorIndex,
              numberOfLayouts,
              setKeyColor: this.setKeyColor,
              setColorPalette: this.setColorPalette,
              setLayer: this.setLayer,
              syncKeyboard: this.syncKeyboard,
              setColorIndexActive: this.setColorIndexActive,
              resetPalette: this.resetPalette
            }}
          >
            {children}
          </Store.Provider>
        )}
      </>
    );
  }
}
