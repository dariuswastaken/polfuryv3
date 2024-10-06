const { exportModules } = require('../../../core/baseExportFSModule');
const path = require('path');

const modules = exportModules(path.join(__dirname, '../../functions/base'));

module.exports = {
  checks: modules.checks,
  dayConversion: modules.dayConversion,
  timeConversion: modules.timeConversion,
  math: modules.math
};
