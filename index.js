const { init } = require('./src/core/init.js');

const dotenv = require('dotenv');
dotenv.config();

const botconfig = require('./src/botconfig/botconfig.js');
console.log(botconfig);

init();
