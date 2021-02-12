const { NativeWindow, BrowserWindow } = require('./electron');
const { register, unregister, Entity } = require('./core');

/*
  Frame
*/

class Frame extends Entity {
  constructor(methods) {
    if (!methods?.onStart) {
      throw new Error('Frame instance must implement a `onStart` method');
    }

    if (!methods?.onUpdate) {
      throw new Error('Frame instance must implement an `onUpdate` method');
    }

    super(methods);

    NativeWindow.whenReady().then(() => {
      this.onStart();

      NativeWindow.on('window-all-closed', this.onWindowAllClosed);
      NativeWindow.on('activate', this.onActivate);
    });
  }

  // Handle window activated
  onActivate() {
    if (BrowserWindow.getAllWindows().length === 0) {
      register();
      this.onStart();
    }
  }

  // Handle window closed
  onWindowAllClosed() {
    unregister();
    NativeWindow.quit();
  }
}

module.exports = {
  Frame
};
