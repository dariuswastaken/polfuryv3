const { exportModules } = require('../../../core/baseExportFSModule');
const path = require('path');

const modules = exportModules(path.join(__dirname, '../../functions/discord'));

module.exports.buttonMenus = {
  sendListTypeSelectMenu: modules.activityListMenus.sendListTypeSelectMenu,
  sendMenuDemitere: modules.demiterePendingMenus.sendMenuDemitere,
  sendMenuChestor: modules.meniuChestorFeatureMenus.sendMenuChestor,
  sendMenuConcediu: modules.meniuConcediuFeatureMenus.sendMenuConcediu,
  sendMenuConducere: modules.meniuConducereFeatureMenus.sendMenuConducere,
  sendMenuInstructor: modules.meniuInstructorFeatureMenus.sendMenuInstructor,
  mphClockInSelect: modules.mphActivityMenus.mphClockInSelect,
  sendSanctionMenu: modules.sanctionThreadCreationMenus.sendSanctionMenu,
  sendSubdepMenu: modules.subdepManagementMenus.sendSubdepMenu,
  sendSubdepSubMenu: modules.subdepManagementMenus.sendSubdepSubMenu,
  sendUserEditMenu: modules.userEditMenus.sendUserEditMenu,
  sendMenuDeleteUser: modules.userEditMenus.sendMenuDeleteUser,
  sendSnapshotOverview: modules.userSnapshotMenus.sendSnapshotOverview,
};