const { ROOT_FRAME } = require('./config/constants');
const { registerFrame } = require('./lib/framework');
const rootFrame = require(`./frames/${ROOT_FRAME}`);

registerFrame(Object.values(rootFrame)[0]);

