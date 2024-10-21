import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handlerDir = path.join(__dirname, '../../discord/handlers');
const eventDir = path.join(__dirname, '../../discord/events');
const slashCommandDir = path.join(__dirname, '../../discord/slash-commands');
const contextMenuDir = path.join(__dirname, '../../discord/context-menus');
const buttonInteractionsDir = path.join(__dirname, '../../discord/button-interactions');
const modalInteractionsDir = path.join(__dirname, '../../discord/modal-interactions');
const stringSelectMenuInteractionsDir = path.join(__dirname, '../../discord/string-select-menu-interactions');

export {
    buttonInteractionsDir,
    contextMenuDir,
    eventDir,
    handlerDir,
    modalInteractionsDir,
    slashCommandDir,
    stringSelectMenuInteractionsDir
};
