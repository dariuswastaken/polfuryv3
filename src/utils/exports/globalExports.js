import { exportModules } from '../../fs/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as exportFiles from './exportFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUtilModules = await exportModules(
  path.join(__dirname, '../functions')
);

const moduleMap = {
  timeConversion: {},
  dayConversion: {},
  math: {},
  checks: {},
  buttonMenus: {},
  embeds: {},
  errors: {},
  validate: {},
  logging: {},
  modals: {},
  quickFunctions: {},
  roles: {},
  selectMenus: {},
  algos: {},
  activity: {}
};

for (const [file, entries] of Object.entries(exportFiles)) {
  if (moduleMap[file]) {
    for (const entry of entries) {
      if (baseUtilModules[entry]) {
        moduleMap[file][entry] = baseUtilModules[entry];
      }
    }
  }
}

const flattenModules = (module) => {
  return Object.keys(module).reduce((acc, key) => {
    if (typeof module[key] === 'object' && !Array.isArray(module[key])) {
      Object.assign(acc, module[key]);
    } else {
      acc[key] = module[key];
    }
    return acc;
  }, {});
};

const globalExports = {
  timeConversion: flattenModules(moduleMap.timeConversion),
  dayConversion: flattenModules(moduleMap.dayConversion),
  math: flattenModules(moduleMap.math),
  checks: flattenModules(moduleMap.checks),
  discord: {
    buttonMenus: flattenModules(moduleMap.buttonMenus),
    embeds: flattenModules(moduleMap.embeds),
    errors: flattenModules(moduleMap.errors),
    validate: flattenModules(moduleMap.validate),
    logging: flattenModules(moduleMap.logging),
    modals: flattenModules(moduleMap.modals),
    quickFunctions: flattenModules(moduleMap.quickFunctions),
    roles: flattenModules(moduleMap.roles),
    selectMenus: flattenModules(moduleMap.selectMenus)
  },
  algorithms: flattenModules(moduleMap.algos),
  activity: {
    utils: flattenModules(moduleMap.activity)
  }
};

export default globalExports;
