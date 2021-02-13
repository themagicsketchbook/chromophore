const { NativeWindow, BrowserWindow } = require('./electron');
const { Entity } = require('./core');

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

module.exports = {
  Frame
};
