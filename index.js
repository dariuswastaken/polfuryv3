import init from './src/core/init.js';

import dotenv from 'npm:dotenv';
dotenv.config();

import utils from './src/utils/exports/globalExports.js';
console.log(utils);

init.trigger();