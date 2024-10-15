import { exportModules } from '../../core/baseExportFSModule.js';

export const loadBaseUtilModules = async (dir) => {
  return await exportModules(dir);
};