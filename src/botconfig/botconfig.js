import { exportModules } from '../../src/fs/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botconfig = await exportModules(__dirname, './general');

export default botconfig;