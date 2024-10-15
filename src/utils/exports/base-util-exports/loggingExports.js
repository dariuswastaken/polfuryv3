import { exportModules } from '../../../core/baseExportFSModule.js';
import path from 'node:path';

const modules = exportModules(path.join(__dirname, '../../functions/discord'));

module.exports.logging = {
  createLog: modules.base.createLog,
  createSimpleLog: modules.base.createSimpleLog
};
