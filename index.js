import init from './src/core/init.js';
import { Pulsar } from './pulsar/index.pulsar.js';

import dotenv from 'npm:dotenv';
dotenv.config();

console.log(Pulsar());

init.trigger();