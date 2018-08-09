import React from "react";
import SerialPort from "serialport";
import { fromEvent, never, from, periodic, constant, of } from "most";
import { evolve, always, clamp, adjust, F, T } from "ramda";
import {
  getRGBArrayFromPalette,
  getPaletteFromRGBArray,
  getLayoutsFromArray,
  getLayouts
} from "../common/utils";
import Loader from "./Loader";
import { startOfISOWeek } from "date-fns";

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
  comName: null,
  numberOfLayouts: 1,
  activeLayoutIndex: 0,
  activeColorIndex: 0,
  fatalError: false,
  inSync: { status: false, error: true }
};

const Store = React.createContext(DEFAULT_STATE);

export const Consumer = Store.Consumer;

export const SERIAL_OK = ".";

export const ERROR = {
  RECOVER: "RECOVER",
  FATAL: "ERROR_FATAL"
};

export default class Provider extends React.Component {
  port = null;
  data$ = never();
  reconnect$ = periodic(3000).observe(async e => {
    const { inSync: { error }, comName, fatalError } = this.state;

    // do not reconnect if are not facing any error.. or if error is fatal
    if (!error || fatalError) return;

    console.log("Trying to reconnect...");
    this.connect();
  });

  state = DEFAULT_STATE;

  componentWillUnmount() {
    this.closeSerial();
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

    this.setState({
      numberOfLayouts: layouts.length,
      palette: palette,
      layouts: layouts,
      fatalError: false,
      inSync: {
        status: true,
        error: false
      }
    });
  }

  setLayer = layerId => {
    const { layouts } = this.state;

    this.setState({
      activeLayoutIndex: clamp(0, layouts.length - 1, layerId)
    });
  };

  setColorPalette = (id, color) => {
    this.setState(
      evolve({
        palette: adjust(always(color), id),
        activeColorIndex: always(id),
        inSync: {
          status: F
        }
      })
    );
  };

  resetPalette = () => {
    this.setState(
      evolve({
        palette: always(DEFAULT_PALETTE),
        inSync: {
          status: F
        }
      })
    );
  };

  setKeyColor = keyId => {
    const { layouts, activeColorIndex, activeLayoutIndex } = this.state;

    this.setState(
      evolve({
        layouts: adjust(
          adjust(always(activeColorIndex), keyId),
          activeLayoutIndex
        ),
        inSync: {
          status: F
        }
      })
    );
  };

  setColorIndexActive = color => {
    this.setState({
      activeColorIndex: color
    });
  };

  syncKeyboard = async () => {
    console.log("Attempt to sync the keyboard...");
    const { palette, layouts } = this.state;

    if (!palette || !layouts) {
      throw new Error("[syncKeyboard] Doesn't have a data to synchronize");
    }

    try {
      // await this.sendCommand(`palette ${getPaletteFromRGBArray(palette)}`);
      await this.sendCommand(`colormap.map ${getLayoutsFromArray(layouts)}`);
    } catch (e) {
      this.errorReducer(e);
      console.error(`[syncKeyboard] Error in synchronization: ${e}`);
      return;
    }

    console.log("...sync OK");
    this.setState({
      inSync: {
        status: T,
        error: F
      }
    });
  };

  closeSerial = () => {
    this.port.close();
  };

  createSerial(com) {
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
        .takeUntil(of().delay(60000))
        .subscribe({
          next: message => {
            if (message.trim() === SERIAL_OK) {
              if (reply) {
                return rej(ERROR.FATAL);
              } else {
                return res(SERIAL_OK);
              }
            }

            res(message);
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
    const serials = await SerialPort.list();
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
      console.error(e);
      this.setState({
        fatalError: true
      });
    }

    this.setState({
      comName
    });
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
            {this.props.children}
          </Store.Provider>
        )}
      </>
    );
  }
}
