import { exportModules } from '../../../core/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const categories = [
  'activityListMenus',
  'demiterePendingMenus',
  'meniuChestorFeatureMenus',
  'meniuConcediuFeatureMenus',
  'meniuConducereFeatureMenus',
  'meniuInstructorFeatureMenus',
  'mphActivityMenus',
  'sanctionThreadCreationMenus',
  'subdepManagementMenus',
  'userEditMenus',
  'userSnapshotMenus'
];

const buttonMenus = {};

/*try {
  for (const category of categories) {
    if (modules[category]) {
      Object.assign(buttonMenus, modules[category]);
    }
  }
} catch (error) {
  console.error(error);
}*/

export { buttonMenus };
