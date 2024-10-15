import init from './src/core/init.js';

import dotenv from 'npm:dotenv';
dotenv.config();

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { exportModules } from './src/core/baseExportFSModule.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pulsarDiscordModules = exportModules(
  path.join(__dirname, './pulsar/src/functions/discord')
);

console.log(pulsarDiscordModules);
