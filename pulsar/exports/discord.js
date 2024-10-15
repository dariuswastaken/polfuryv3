import path from 'node:path'
import { exportModules } from '../src/core/baseExportFSModule.js'

const pulsarDiscordModules = exportModules(
  path.join(__dirname, '../src/functions/discord')
);

module.exports = {
  embeds: {
    createDefaultEmbed: pulsarDiscordModules.defaultEmbed.createDefaultEmbed,
    createErrorEmbed: pulsarDiscordModules.errorEmbed.createErrorEmbed,
    createSuccessEmbed: pulsarDiscordModules.successEmbed.createSuccessEmbed,
    createWarningEmbed: pulsarDiscordModules.warningEmbed.createWarningEmbed,
    createLogEmbed: pulsarDiscordModules.logEmbed.createLogEmbed,
    createForumThreadEmbed: pulsarDiscordModules.forumThreadEmbed.createForumThreadEmbed,
    createEmbed: pulsarDiscordModules.baseCustomizableEmbed.createEmbed,
  },
  menus: {
    createSelectMenu: pulsarDiscordModules.selectMenuBuilder.createSelectMenu,
    createButtonMenu: pulsarDiscordModules.buttonMenuBuilder.createButtonMenu,
  },
  modals: {
    createModal: pulsarDiscordModules.modalBuilder.createModal,
  }
};
