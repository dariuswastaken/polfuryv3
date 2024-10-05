const { exportModules } = require('../../../core/baseExportFSModule');
const path = require('path');

const modules = exportModules(path.join(__dirname, '../../functions/discord'));

module.exports.roles = {
  updateRankRoles: modules.rankUpdates.updateRankRoles,
  updateRankRolesCI: modules.rankUpdates.updateRankRolesCI
};
