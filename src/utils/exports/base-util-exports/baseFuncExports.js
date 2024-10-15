import { exportModules } from '../../../core/baseExportFSModule.js';
import path from 'node:path';

const modules = exportModules(path.join(__dirname, '../../functions/base'));

module.exports = {
  checks: modules.checks,
  dayConversion: modules.dayConversion,
  timeConversion: modules.timeConversion,
  math: modules.math
};
