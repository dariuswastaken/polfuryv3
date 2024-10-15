import PulsarClient from './src/client.pulsar.js';

import path from 'node:path';
import { exportModules } from '../src/core/baseExportFSModule.js';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pulsarDiscordModules = exportModules(
  path.join(__dirname, '../src/functions/discord')
);

export const Pulsar = function () {
  console.log(pulsarDiscordModules);
  
  return new PulsarClient();
};
