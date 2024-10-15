import { exportModules } from '../../../fs/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = await exportModules(
  path.join(__dirname, '../../functions/discord')
);

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

const exports = {};

for (const category of categories) {
  if (modules[category]) {
    Object.assign(exports, modules[category]);
  }
}

export { exports };