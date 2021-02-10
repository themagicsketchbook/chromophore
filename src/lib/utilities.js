const { WINDOW_WIDTH, WINDOW_HEIGHT } = require('../config/constants');
const { BrowserWindow } = require('./electron');
const { Frame } = require('./framework');

// Create a frame instance
const createFrame = methods => new Frame(methods);

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
  createFrame,
  createWindow
};
