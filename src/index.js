const { ROOT_CONTEXT } = require('./config/constants');
const { register } = require('./lib/Core');
const rootFrame = require(`./frames/${ROOT_CONTEXT}`);

register(Object.values(rootFrame)[0]);

