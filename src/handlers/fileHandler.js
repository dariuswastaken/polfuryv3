import * as dirs from '../imports/dirs.js';
import { Pulsar } from '../../pulsar/index.pulsar.js';
import { printTable } from 'npm:console-table-printer';

const fileSystem = Pulsar().fileManager.createInstance();
const client = Pulsar().client;
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
      await item.execute(Pulsar);
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

export const loadFilesystem = async () => {
  console.log('[FILESYSTEM] Loading filesystem...');

  fileSystem.loadFilesFromDir(dirs.handlerDir, async (filePath) => {
    try {
      const handlerModule = await import(filePath);
      const handler = handlerModule.default;

      console.log('[FILESYSTEM] Loaded handler: ' + handler.name);
      client.collections.handlers.set(handler.name, handler);

      if (typeof handler.execute === 'function') {
        await handler.execute(Pulsar);
        events.push({ name: handler.name, type: 'Handler', loaded: '✅' });
      } else {
        console.error(
          '[FILESYSTEM ERROR] Handler does not have an execute function: ' +
            filePath
        );
        events.push({ name: handler.name, type: 'Handler', loaded: '❌' });
      }
    } catch (e) {
      console.error(
        '[FILESYSTEM ERROR] Failed to load handler from ' + filePath
      );
      console.error(e);
    }
  });

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

  /*for (const { dir, collection, type } of directories) {
    try {
      fileSystem.loadFilesFromDir(dir, async (filePath) => {
        console.log(`[FILESYSTEM] Loading ${type} from: ${filePath}`);
        await loadEvents(filePath, collection, type);
      });
    } catch (e) {
      console.error(
        `[FILESYSTEM ERROR] ${type} loading failed for directory: ${dir}`
      );
      console.error(e);
    }
    }*/

  printTable(events);
  console.log('[FILESYSTEM] Filesystem has been loaded.');
};
