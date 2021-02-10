const { BrowserWindow } = require('../../../src/lib/electron');
const { createFrame, createWindow } = require('../../lib/utilities');
const { useState, registerFrame } = require('../../../src/lib/framework');

const { ROOT_HTML } = require('./src/config/constants');

// Local variables
const rootFilePath = `${__dirname}/src/pages/${ROOT_HTML}/index.html`;

// State variables
let [window, setWindow] = useState();

const GameEngine = createFrame({
  onStart: function() {
    window = setWindow(createWindow()).loadFile(rootFilePath);
    console.log('Engine started.');
  },

  onActivate: function() {
    console.log('Window activated.');
    if (!window || BrowserWindow.getAllWindows().length === 0) {
      registerFrame();
      this.onStart();
    }
  },

  onUpdate: function() {
    console.log('Engine updated.');
  }
});

module.exports = {
  GameEngine
};
