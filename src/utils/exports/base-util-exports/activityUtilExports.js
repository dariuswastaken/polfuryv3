import { exportModules } from '../../../core/baseExportFSModule.js';
import path from 'node:path';

const modules = exportModules(path.join(__dirname, '../../functions/activity'));

module.exports = {
  utils: modules.utils
};
