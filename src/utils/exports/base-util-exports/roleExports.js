import { exportModules } from '../../../core/baseExportFSModule.js';
import path from 'node:path';

const modules = exportModules(path.join(__dirname, '../../functions/discord'));

module.exports.roles = {
  updateRankRoles: modules.rankUpdates.updateRankRoles,
  updateRankRolesCI: modules.rankUpdates.updateRankRolesCI
};
