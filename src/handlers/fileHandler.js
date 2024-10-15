import * as dirs from '../imports/dirs.js';
import { Pulsar } from '../../pulsar/index.pulsar.js';
import { printTable } from 'npm:console-table-printer';

const fileSystem = Pulsar().fileManager.createInstance();

const client = Pulsar().client;

let events = [];

const loadEvents = async (path, collection, type) => {
  const itemModule = await import(path);
  const item = itemModule.default;
  try {
    if (type === 'Slash Command' || type === 'Context Menu') {
      collection.set(item.data.name, item);
      events.push({
        name: item.data.name,
        type: type,
        loaded: '✅'
      });
    } else if (type === 'Event') {
      collection.set(item.name, item);
      item.execute(Pulsar);
      events.push({
        name: item.name,
        type: type,
        loaded: '✅'
      });
    } else {
      collection.set(item.name, item);
      events.push({
        name: item.name,
        type: type,
        loaded: '✅'
      });
    }
  } catch (e) {
    console.error(
      '[FILESYSTEM ERROR] ' + type + 'loading has failed at: ' + path
    );
    console.error(e);
    events.push({
      name: path,
      type: type,
      loaded: '❌'
    });
  }
};

const directoryChecker = async (dir) => {
  if (!fs.existsSync(dir)) {
    console.error(`[FILESYSTEM] ${dir} does not exist in the filesystem`);
    return false;
  }
  return true;
};

export const loadFilesystem = async () => {
  fileSystem.loadFilesFromDir(dirs.handlerDir, async (path) => {
    const handlerModule = await import(path);
    const handler = handlerModule.default;
    client.collections.handlers.set(handler.name, handler);
    if (typeof handler.execute === 'function') {
      handler.execute(Pulsar);
      events.push({
        name: handler.name,
        type: 'Handler',
        loaded: '✅'
      });
    } else {
      console.error(
        '[FILESYSTEM ERROR] Handler does not have an execute function: ' + path
      );
      events.push({
        name: handler.name,
        type: 'Handler',
        loaded: '❌'
      });
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

  console.log('[FILESYSTEM] Loading filesystem...');

  for (const { dirs, collection, type } of directories) {
    try {
      fileSystem.loadFilesFromDir(dirs, async (path) => {
        if (!dirs || !directoryChecker(dirs)) {
          return;
        }
        loadEvents(path, collection, type);
      });
    } catch (e) {
      console.error('[FILESYSTEM ERROR] ' + type + ' loading has failed');
      console.error(e);
    }
  }

  printTable(events);
  console.log('[FILESYSTEM] Filesystem has been loaded.');
};
