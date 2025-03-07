import * as dirs from '../imports/dirs.js';
import pulsarInstance from '../core/pulsarInstance.js';
import { exportModules } from '../fs/baseExportFSModule.js';
import createGlobalUtilExports from '../../src/utils/exports/globalExports.js';
import createBotconfig from '../botconfig/botconfig.js';
import createMongoQueries from '../mongo/mongoQueries.js';
import client from '../core/client.js';

const botconfig = await createBotconfig(exportModules);
const utils = await createGlobalUtilExports(exportModules);
const mongo = await createMongoQueries(exportModules);

pulsarInstance.client = client;

const fileSystem = pulsarInstance.fileManager.createInstance();
let events = [];

const loadEvents = async (filePath, collection, type) => {
    try {
        const itemModule = await import(filePath);
        const item = itemModule.default;

        if (type === 'Slash Command' || type === 'Context Menu') {
            collection.set(item.data.name, item);
            events.push({ name: item.data.name, type, loaded: '✅' });
        } else if (type === 'Event') {
            collection.set(item.name, item);
            await item.execute(pulsarInstance, mongo);
            events.push({ name: item.name, type, loaded: '✅' });
        } else {
            collection.set(item.name, item);
            events.push({ name: item.name, type, loaded: '✅' });
        }
    } catch (e) {
        console.error(`[FILESYSTEM ERROR] ${type} loading failed at: ${filePath}`);
        console.error(e);
        events.push({ name: filePath, type, loaded: '❌' });
    }
};

export const loadHandlers = async () => {
    fileSystem.loadFilesFromDir(dirs.handlerDir, async (filePath) => {
        try {
            const handlerModule = await import(filePath);
            const handler = handlerModule.default;

            client.collections.handlers.set(handler.name, handler);

            if (typeof handler.execute === 'function') {
                await handler.execute(pulsarInstance, utils, botconfig, mongo);
                events.push({ name: handler.name, type: 'Handler', loaded: '✅' });
            } else {
                console.error(
                    '[FILESYSTEM ERROR] Handler does not have an execute function: ' + filePath
                );
                events.push({ name: handler.name, type: 'Handler', loaded: '❌' });
            }
        } catch (e) {
            console.error('[FILESYSTEM ERROR] Failed to load handler from ' + filePath);
            console.error(e);
        }
    });
};

export const loadBaseFilesystem = async () => {
    console.log('[FILESYSTEM] Loading filesystem...');

    const directories = [
        {
            dir: dirs.eventDir,
            collection: client.collections.events,
            type: 'Event'
        },
        {
            dir: dirs.slashCommandDir,
            collection: client.collections.slashCommands,
            type: 'Slash Command'
        },
        {
            dir: dirs.contextMenuDir,
            collection: client.collections.contextMenus,
            type: 'Context Menu'
        },
        {
            dir: dirs.buttonInteractionsDir,
            collection: client.collections.buttonInteractionEvents,
            type: 'Button Interaction'
        },
        {
            dir: dirs.modalInteractionsDir,
            collection: client.collections.modalInteractionEvents,
            type: 'Modal Interaction'
        },
        {
            dir: dirs.stringSelectMenuInteractionsDir,
            collection: client.collections.stringSelectMenuInteractionEvents,
            type: 'String Select Menu Interaction'
        }
    ];

    for (const { dir, collection, type } of directories) {
        try {
            fileSystem.loadFilesFromDir(dir, async (filePath) => {
                await loadEvents(filePath, collection, type);
            });
        } catch (e) {
            console.error(`[FILESYSTEM ERROR] ${type} loading failed for directory: ${dir}`);
            console.error(e);
        }
    }

    console.log('[FILESYSTEM] Filesystem has been loaded.');
};
