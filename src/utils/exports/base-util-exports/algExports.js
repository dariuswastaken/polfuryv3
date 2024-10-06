const { exportModules } = require('../../../core/baseExportFSModule');
const path = require('path');

const modules = exportModules(
  path.join(__dirname, '../../functions/algorithms')
);

module.exports = {
  algos: modules.algos,
  algoUtils: modules.algoUtils
};
