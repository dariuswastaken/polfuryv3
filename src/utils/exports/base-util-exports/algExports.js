import { exportModules } from '../../../core/baseExportFSModule.js';
import path from 'node:path';

const modules = exportModules(
  path.join(__dirname, '../../functions/algorithms')
);

module.exports = {
  algos: modules.algos,
  algoUtils: modules.algoUtils
};
