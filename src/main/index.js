import { app, BrowserWindow, Menu, shell } from "electron";
import { format as formatUrl } from "url";
import * as path from "path";
import { homepage } from "../../package.json";

const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    maxWidth: 800,
    maxHeight: 600,
    minHeight: 490,
    minWidth: 700,
    resizable: false
  });

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  const menu = Menu.buildFromTemplate([
    {
      role: "window",
      submenu: [
        {
          label: "About",
          click() {
            shell.openExternal(homepage);
          }
        },
        { role: "minimize" },
        { role: "close" }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();
});
