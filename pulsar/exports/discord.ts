import path from 'node:path';
import { exportModules } from '../src/core/baseExportFSModulePulsar.ts';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pulsarDiscordModules = await exportModules(path.join(__dirname, '../src/functions/discord'));

const embeds = {
    createDefaultEmbed: pulsarDiscordModules.defaultEmbed?.createDefaultEmbed,
    createErrorEmbed: pulsarDiscordModules.errorEmbed?.createErrorEmbed,
    createSuccessEmbed: pulsarDiscordModules.successEmbed?.createSuccessEmbed,
    createWarningEmbed: pulsarDiscordModules.warningEmbed?.createWarningEmbed,
    createLogEmbed: pulsarDiscordModules.logEmbed?.createLogEmbed,
    createForumThreadEmbed: pulsarDiscordModules.forumThreadEmbed?.createForumThreadEmbed,
    createEmbed: pulsarDiscordModules.baseCustomizableEmbed?.createEmbed
};

const menus = {
    createSelectMenu: pulsarDiscordModules.selectMenuBuilder?.createSelectMenu,
    createButtonMenu: pulsarDiscordModules.buttonMenuBuilder?.createButtonMenu
};

const modals = {
    createModal: pulsarDiscordModules.modalBuilder?.createModal
};

export { embeds, menus, modals };
