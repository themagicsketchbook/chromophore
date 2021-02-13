const { NativeWindow, BrowserWindow } = require('./Electron');
const { Entity } = require('./Core');

/*
  Frame
*/

class Frame extends Entity {
  constructor() {
    super();

    if (!this?.onStart) {
      throw new Error('Frame instance must implement a `onStart` method');
    }

    NativeWindow.whenReady().then(() => {
      this.onStart();

      NativeWindow.on('window-all-closed', this.onWindowAllClosed);
      NativeWindow.on('activate', this.onActivate);
    });
  }

  // Handle window activated
  onActivate() {
    if (BrowserWindow.getAllWindows().length === 0) {
      this.onStart();
    }
  }

  // Handle window closed
  onWindowAllClosed() {
    NativeWindow.quit();
  }
}

const { WINDOW_WIDTH, WINDOW_HEIGHT } = require('../config/constants');

// Create a browser window instance
const createWindow = () => (
  new BrowserWindow({
    darkTheme: true,
    fullscreen: false,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    webPreferences: {
      allowRunningInsecureContent: false,
      contextIsolation: true,
      nodeIntegration: true
    },
    title: 'Tile Engine'
  })
);


module.exports = {
  createWindow,
  Frame
};
