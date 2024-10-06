const path = require('path');
const { exportModules } = require('../../core/baseExportFSModule');

const baseUtilModules = exportModules(
  path.join(__dirname, './base-util-exports')
);

module.exports = {
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
  },
};
