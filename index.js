import init from './src/core/init.js';

import dotenv from 'npm:dotenv';
dotenv.config();

import baseUtilModules from './src/utils/exports/globalExports.js';

console.log(baseUtilModules);

init.trigger();