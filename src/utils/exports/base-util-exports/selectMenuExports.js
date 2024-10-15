import { exportModules } from '../../../core/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = await exportModules(
  path.join(__dirname, '../../functions/discord/select-menus')
);

const categories = [
  'meniuChestorSelectMenus',
  'meniuConducereSelectMenus',
  'meniuInstructorSelectMenus',
  'sanctionThreadsSelectMenus',
  'userActivitySelectMenus',
  'userSnapshotSelectMenus'
];

const selectMenus = {};

try {
  for (const category of categories) {
    if (modules[category]) {
      Object.assign(selectMenus, modules[category]);
    }
  }
} catch (error) {
  console.error(error);
}

export { selectMenus };
