const { createFrame, createWindow } = require('../../lib/factories');
const { useState } = require('../../../src/lib/core');

const { ROOT_CONTEXT } = require('./src/config/constants');

// Local variables
const rootFilePath = `${__dirname}/src/pages/${ROOT_CONTEXT}/index.html`;

// State variables
let [window, setWindow] = useState();

const GameEngine = createFrame({

  // Engine starts
  onStart: function() {
    window = setWindow(createWindow()).loadFile(rootFilePath);
    console.log('Engine started.');
  },

  // Engine updates
  onUpdate: function() {
    console.log('Engine state changed.');
  }
});

module.exports = {
  GameEngine
};
