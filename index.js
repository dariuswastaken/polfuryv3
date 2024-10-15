import init from './src/core/init.js';

import dotenv from 'npm:dotenv';
dotenv.config();

import { exportModules } from './src/core/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoQueries = await exportModules(path.join(__dirname, './src/mongo/functions'));

console.log(mongoQueries);

// init.trigger();