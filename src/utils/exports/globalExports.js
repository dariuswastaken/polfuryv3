import { exportModules } from '../../fs/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as exportFiles from './exportFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUtilModules = await exportModules(
  path.join(__dirname, '../functions')
);

for (const file of Object.keys(exportFiles)) {
  console.log(file);
}

/*const glbobalExports = {
  timeConversion: baseUtilModules.baseFuncExports.timeConversion,
  dayConversion: baseUtilModules.baseFuncExports.dayConversion,
  math: baseUtilModules.baseFuncExports.math,
  checks: baseUtilModules.baseFuncExports.checks,
  discord: {
    buttonMenus: baseUtilModules.buttonMenuExports.buttonMenus,
    embeds: baseUtilModules.embedExports.embeds,
    errors: baseUtilModules.errorEmbedExports.errors,
    validate: baseUtilModules.inputValidationExports.validate,
    logging: baseUtilModules.loggingExports.logging,
    modals: baseUtilModules.modalExports.modals,
    quickFunctions: baseUtilModules.quickFuncExports.quickFunctions,
    roles: baseUtilModules.roleExports.roles,
    selectMenus: baseUtilModules.selectMenuExports.selectMenus
  },
  algorithms: baseUtilModules.algExports.algos,
  activity: {
    utils: baseUtilModules.activityUtilExports.utils
  }
};*/

export default baseUtilModules;
