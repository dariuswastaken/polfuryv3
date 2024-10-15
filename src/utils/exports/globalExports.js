import { exportModules } from '../../fs/baseExportFSModule';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUtilModules = await exportModules(
  path.join(__dirname, '../functions')
);

export default baseUtilModules;