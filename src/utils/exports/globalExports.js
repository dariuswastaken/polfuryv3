import { exportModules } from '../../fs/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as exportFiles from './exportFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUtilModules = await exportModules(
  path.join(__dirname, '../functions')
);

const timeConversion = {};
const dayConversion = {};
const math = {};
const checks = {};
const buttonMenus = {};
const embeds = {};
const errors = {};
const validate = {};
const logging = {};
const modals = {};
const quickFunctions = {};
const roles = {};
const selectMenus = {};
const algos = {};
const activity = {};

const moduleMap = {
  activity,
  algos,
  timeConversion,
  dayConversion,
  math,
  checks,
  buttonMenus,
  embeds,
  validate,
  logging,
  modals,
  quickFunctions,
  roles,
  selectMenus
};

for (const file of Object.keys(exportFiles)) {
  const targetObject = moduleMap[file];
  if (targetObject) {
    for (const entry of exportFiles[file]) {
      Object.assign(targetObject, entry);
    }
  }
}

const globalExports = {
  timeConversion: timeConversion,
  dayConversion: dayConversion,
  math: math,
  checks: checks,
  discord: {
    buttonMenus: buttonMenus,
    embeds: embeds,
    errors: errors,
    validate: validate,
    logging: logging,
    modals: modals,
    quickFunctions: quickFunctions,
    roles: roles,
    selectMenus: selectMenus
  },
  algorithms: algos,
  activity: {
    utils: activity
  }
};

export default globalExports;