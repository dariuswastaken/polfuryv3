const { exportModules } = require('../../../core/baseExportFSModule');
const path = require('path');

const modules = exportModules(path.join(__dirname, '../../functions/discord'));

module.exports.quickFunctions = {
  createUpList: modules.chestorListsQFuncs.createUpList,
  createOutList: modules.chestorListsQFuncs.createOutList,
  addCertificat: modules.meniuInstructorQFuncs.addCertificat,
  removeCertificat: modules.meniuInstructorQFuncs.removeCertificat,
  createSanctionThread: modules.sanctionThreadsQFuncs.createSanctionThread,
  addSanctionToMember: modules.sanctionThreadsQFuncs.addSanctionToMember,
  createSanctionPrivateChannel: modules.sanctionThreadsQFuncs.createSanctionPrivateChannel,
  createChannelTranscript: modules.simpleTranscriptGeneratorQFuncs.createChannelTranscript,
  addFunc: modules.subdepManagementQFuncs.addFunc,
  removeFunc: modules.subdepManagementQFuncs.removeFunc,
  addAcademiePD: modules.userAddQFuncs.addAcademiePD,
  addReintegrarePD: modules.userAddQFuncs.addReintegrarePD,
  addMemberPD: modules.userAddQFuncs.addMemberPD
};
