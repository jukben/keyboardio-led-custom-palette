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
  inSync: { status: false, error: true },
  setColorPalette: null,
  syncKeyboard: null,
  resetColorPalette: null
};

const Store = React.createContext(DEFAULT_STATE);

export const Consumer = Store.Consumer;

export const SERIAL_OK = ".";

export default class Provider extends React.Component {
  port = null;
  data$ = never();
  reconnect$ = periodic(3000).observe(async e => {
    const { inSync: { error }, comName } = this.state;
    if (!error) return;

    console.log("Trying to reconnect...");
    this.connect();
  });

  state = DEFAULT_STATE;

  componentWillUnmount() {
    this.port.close();
  }

  async getData() {
    const palette = getRGBArrayFromPalette(await this.sendCommand("palette"));
    const layout = getLayout(await this.sendCommand("lcp.map"));

    this.setState(
      evolve({
        palette: always(palette),
        layout: always(layout),
        inSync: {
          status: T,
          error: F
        }
      })
    );
  }

  setColorPalette = (id, color) => {
    const palette = [...this.state.palette];

    palette[id] = color;

    this.setState(
      evolve({
        palette: always(palette),
        isSync: {
          status: F
        }
      })
    );
  };

  resetPalette = () => {
    this.setState({
      palette: DEFAULT_PALETTE,
      isSync: {
        status: F
      }
    });
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
    console.log("sync");
    const { palette, layout } = this.state;

    if (!palette || !layout) {
      throw new Error("[syncKeyboard] Doesn't have a data to synchronize");
    }

    try {
      await this.sendCommand(`palette ${getPaletteFromRGBArray(palette)}`);
      await this.sendCommand(`lcp.map ${getLayoutFromArray(layout)}`);
    } catch (e) {
      console.error(`[syncKeyboard] Error in synchronization: ${e}`);
      this.setState(
        evolve({
          inSync: {
            error: always(
              "Unable to synchronize! It's your Model01 still plugged in?"
            )
          }
        })
      );
      return;
    }

    this.setState(
      evolve({
        inSync: {
          status: T,
          error: F
        }
      })
    );
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

  async sendCommand(command) {
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
              return res(SERIAL_OK);
            }

            res(message);
          },
          error: e => {
            throw new Error(`[sendCommand] Something is wrong! ${e}`);
          },
          complete: e => {
            rej(`Timeout on command ${command}, last event: "${e}"`);
          }
        });
    });
  }

  async connect() {
    const serials = await SerialPort.list();
    const keyboard = serials.filter(
      ({ manufacturer }) => manufacturer === "Keyboardio"
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
    const { palette, layout, activeColorIndex, comName, inSync } = this.state;

    const configurationLoaded = palette && layout;

    return (
      <>
        {!configurationLoaded && <Loader />}
        {configurationLoaded && (
          <Store.Provider
            value={{
              palette,
              layout,
              inSync,
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
