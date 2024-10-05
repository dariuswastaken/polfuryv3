const { exportModules } = require('../../../core/baseExportFSModule');
const path = require('path');

const modules = exportModules(path.join(__dirname, '../../functions/discord'));

module.exports.embeds = {
  sendUpList: modules.activityListMenus.sendUpList,
  sendOutList: modules.activityListMenus.sendOutList,
  sendActivityUpdateRetryEmbed: modules.activityManagementEmbeds.sendActivityUpdateRetryEmbed,
  sendSuccessEmbed: modules.baseEmbeds.sendSuccessEmbed,
  sendWarningEmbed: modules.baseEmbeds.sendWarningEmbed,
  sendUserCooldownList: modules.meniuInstructorEmbeds.sendUserCooldownList,
  sendSubdepMemberList: modules.subdepManagementEmbeds.sendSubdepMemberList,
  sendInstrActivityEmbed: modules.subdepManagementEmbeds.sendInstrActivityEmbed,
  sendUserActivityEmbed: modules.userActivityEmbeds.sendUserActivityEmbed,
  sendUserInfoEmbed: modules.userInfoEmbeds.sendUserInfoEmbed
};