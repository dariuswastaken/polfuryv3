const { exportModules } = require('../../../core/baseExportFSModule');
const path = require('path');

const modules = exportModules(path.join(__dirname, '../../functions/discord'));

module.exports.logging = {
  createLog: modules.base.createLog,
  createSimpleLog: modules.base.createSimpleLog
};
