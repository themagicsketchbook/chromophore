const { createWindow, Frame } = require('../../lib/Framework');
const { useState } = require('../../../src/lib/Core');

const { ROOT_CONTEXT } = require('./src/config/constants');

// Local variables
const rootFilePath = `${__dirname}/src/pages/${ROOT_CONTEXT}/index.html`;

// State variables
let [window, setWindow] = useState();

class Engine extends Frame {
  // Engine starts
  onStart() {
    window = setWindow(createWindow()).loadFile(rootFilePath);
    console.log('Engine started.');
  }

  // Engine updates
  onUpdate() {
    console.log('Engine state changed.');
  }
}

const GameEngine = new Engine();

module.exports = {
  GameEngine
};
