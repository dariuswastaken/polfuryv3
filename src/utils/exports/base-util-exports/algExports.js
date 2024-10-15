import { exportModules } from '../../../core/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = await exportModules(
  path.join(__dirname, '../../functions/algorithms')
);

const categories = ['algos', 'algoUtils'];

const exports = {};

for (const category of categories) {
  if (modules[category]) {
    Object.assign(exports, modules[category]);
        console.log(`Loaded ${category} functions`)
  }
}

export default exports;
