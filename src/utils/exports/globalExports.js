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

const globalExports = {
  timeConversion: moduleMap.timeConversion,
  dayConversion: moduleMap.dayConversion,
  math: moduleMap.math,
  checks: moduleMap.checks,
  discord: {
    buttonMenus: moduleMap.buttonMenus,
    embeds: moduleMap.embeds,
    errors: moduleMap.errors,
    validate: moduleMap.validate,
    logging: moduleMap.logging,
    modals: moduleMap.modals,
    quickFunctions: moduleMap.quickFunctions,
    roles: moduleMap.roles,
    selectMenus: moduleMap.selectMenus
  },
  algorithms: moduleMap.algos,
  activity: {
    utils: moduleMap.activity
  }
};

export default globalExports;
