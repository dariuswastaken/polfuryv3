import { exportModules } from '../../../core/baseExportFSModule.js';
import path from 'node:path';

import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = await exportModules(
  path.join(__dirname, '../../functions/discord/input-validation')
);

const categories = [
  'baseInputValidation',
  'formValidation',
  'meniuConcediuValidation',
  'subdepManagementValidation'
];

const validate = {};

try {
  for (const category of categories) {
    if (modules[category]) {
      Object.assign(validate, modules[category]);
    }
  }
} catch (error) {
  console.error(error);
}

export { validate };
