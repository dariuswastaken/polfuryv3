import { exportModules } from '../../../core/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = exportModules(path.join(__dirname, '../../functions/discord'));

const categories = [
  'formModals',
  'meniuConcediuModals',
  'sanctionThreadsModals',
  'subdepManagementModals',
  'userEditMenuModals'
];

const modals = {};

/*try {
  for (const category of categories) {
    if (modules[category]) {
      Object.assign(modals, modules[category]);
    }
  }
} catch (error) {
  console.error(error);
}*/

export default modals;
