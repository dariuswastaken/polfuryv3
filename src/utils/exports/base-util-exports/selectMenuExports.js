const { exportModules } = require('../../../core/baseExportFSModule');
const path = require('path');

const modules = exportModules(path.join(__dirname, '../../functions/discord'));

module.exports.selectMenus = {
  sendChestorRankChoiceMenu: modules.meniuChestorSelectMenus.sendChestorRankChoiceMenu,
  sendWeekChoiceMenu: modules.meniuChestorSelectMenus.sendWeekChoiceMenu,
  sendListWeekChoiceMenu: modules.meniuChestorSelectMenus.sendListWeekChoiceMenu,
  sendListDeleteWeekChoiceMenu: modules.meniuChestorSelectMenus.sendListDeleteWeekChoiceMenu,
  sendRankChoiceMenu: modules.meniuConducereSelectMenus.sendRankChoiceMenu,
  sendCertificatChoiceMenuCooldown: modules.meniuInstructorSelectMenus.sendCertificatChoiceMenuCooldown,
  sendCooldownCertificatDurationSelect: modules.meniuInstructorSelectMenus.sendCooldownCertificatDurationSelect,
  sendSanctionDurationChoiceMenu: modules.sanctionThreadsSelectMenus.sendSanctionDurationChoiceMenu,
  sendActivityWeekChoiceMenu: modules.userActivitySelectMenus.sendActivityWeekChoiceMenu,
  sendUserSnapshotChoiceMenu: modules.userSnapshotSelectMenus.sendUserSnapshotChoiceMenu
};
