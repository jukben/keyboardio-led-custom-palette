import React from "react";
import SerialPort from "serialport";
import { fromEvent, never, from, periodic, constant, of } from "most";
import { evolve, always, adjust, F, T } from "ramda";
import {
  getRGBArrayFromPalette,
  getPaletteFromRGBArray,
  getLayoutFromArray,
  getLayout
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
  layout: null,
  comName: null,
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
    let layout;
    try {
      palette = getRGBArrayFromPalette(await this.sendCommand("palette", true));
      layout = getLayout(await this.sendCommand("lcp.map", true));
    } catch (e) {
      this.errorReducer(e);
      return;
    }

    this.setState(
      evolve({
        palette: always(palette),
        layout: always(layout),
        inSync: {
          status: T,
          error: F
        },
        fatalError: F
      })
    );
  }

  setColorPalette = (id, color) => {
    this.setState(
      evolve({
        palette: adjust(always(color), id),
        activeColorIndex: always(id),
        inSync: {
          status: always(inSync)
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
    const { layout, activeColorIndex } = this.state;
    this.setState(
      evolve({
        layout: adjust(always(activeColorIndex), keyId),
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
    const { palette, layout } = this.state;

    if (!palette || !layout) {
      throw new Error("[syncKeyboard] Doesn't have a data to synchronize");
    }

    try {
      await this.sendCommand(`palette ${getPaletteFromRGBArray(palette)}`);
      await this.sendCommand(`lcp.map ${getLayoutFromArray(layout)}`);
    } catch (e) {
      this.errorReducer(e);
      console.error(`[syncKeyboard] Error in synchronization: ${e}`);
      return;
    }

    console.log("...sync OK");
    this.setState(
      evolve({
        inSync: {
          status: T,
          error: F
        }
      })
    );
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
          throw new Error(e);
        }

        this.getData();
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
        .takeUntil(of().delay(1000))
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
            this.setState(
              evolve({
                fatalError: T,
                inSync: {
                  status: F,
                  error: T
                }
              })
            );
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

    this.createSerial(comName);

    this.setState({
      comName
    });
  }

  render() {
    const {
      palette,
      layout,
      activeColorIndex,
      comName,
      inSync,
      fatalError
    } = this.state;

    const configurationLoaded = palette && layout;

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
              layout,
              inSync,
              fatalError,
              activeColorIndex,
              setKeyColor: this.setKeyColor,
              setColorPalette: this.setColorPalette,
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
