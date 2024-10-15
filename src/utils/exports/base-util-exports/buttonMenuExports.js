import { exportModules } from '../../../fs/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = await exportModules(
  path.join(__dirname, '../../functions/discord/button-menus')
);

const buttonMenuExports = modules;

export { buttonMenuExports };