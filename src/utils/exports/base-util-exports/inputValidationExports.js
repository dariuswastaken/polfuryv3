const { exportModules } = require('../../../core/baseExportFSModule');
const path = require('path');

const modules = exportModules(path.join(__dirname, '../../functions/discord'));

module.exports.validate = {
  callsignInput: modules.baseInputValidation.callsignInput,
  reasonInput: modules.baseInputValidation.reasonInput,
  formIntrare: modules.formValidation.formIntrare,
  formTrecereTest: modules.formValidation.formTrecereTest,
  motivConcediu: modules.meniuConcediuValidation.motivConcediu,
  callsignInputSubdep: modules.subdepManagementValidation.callsignInputSubdep,
  callsignInputInstrActivity: modules.subdepManagementValidation.callsignInputInstrActivity
};
