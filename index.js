import init from './src/core/init.js';

import dotenv from 'npm:dotenv';
dotenv.config();

import { exportModules } from './src/core/baseExportFSModule.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUtilModules = await exportModules(
  path.join(__dirname, './src/utils/exports/base-util-exports')
);

console.log(baseUtilModules);


init.trigger();