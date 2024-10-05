const { exportModules } = require('../../core/baseExportFSModule');
const path = require('path');

const baseUtilModules = exportModules(path.join(__dirname, './base-util-exports'));

module.exports = {
  timeConversion: require('../functions/timeConversion'),
  dayConversion: require('../functions/dayConversion'),
  math: require('../functions/math'),
  checks: require('../functions/checks'),
  discord: {
    buttonMenus: baseUtilModules.buttonMenuExports.buttonMenus,
    embeds:  baseUtilModules.embedExports.embeds,
    errors: baseUtilModules.errorEmbedExports.errors,
    validate: baseUtilModules.inputValidationExports.validate,
    logging: baseUtilModules.loggingExports.logging,
    modals: baseUtilModules.modalExports.modals,
    quickFunctions: baseUtilModules.quickFuncExports.quickFunctions,
    roles: baseUtilModules.roleExports.roles,
    selectMenus: baseUtilModules.selectMenuExports.selectMenus
  },
  algorithms: require('../functions/algorithms/algos'),
  activity: {
    utils: require('../functions/activity/utils')
  },
};
