import { exportAll } from './globalFSExport.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUtilModules = await exportAll(
  path.join(__dirname, './base-util-exports')
);

export default baseUtilModules;
