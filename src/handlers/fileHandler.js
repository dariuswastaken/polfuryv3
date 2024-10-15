import * as dirs from '../imports/dirs.js';
import { Pulsar } from '../../pulsar/index.pulsar.js';
import { printTable } from 'npm:console-table-printer';

const fileSystem = Pulsar().fileManager.createInstance();

const client = Pulsar().client;

let events = [];

const loadEvents = async (path, collection, type) => {
  const item = await import(path).default;
  try {
    if (type === 'Slash Command' || type === 'Context Menu') {
      collection.set(item.data.name, item);
      events.push({
        name: item.data.name,
        type: type,
        loaded: '✅',
      });
    } else if (type === 'Event') {
      collection.set(item.name, item);
      item.execute(Pulsar);
      events.push({
        name: item.name,
        type: type,
        loaded: '✅'
      })
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
      name: item.name,
      type: type,
      loaded: '❌',
    });
  }
};

export const loadFilesystem = () => {
  fileSystem.loadFilesFromDir(dirs.handlerDir, async (path) => {
    const handler = await import(path).default;
    console.log(handler)
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

  directories.forEach(({ dir, collection, type }) => {
    fileSystem.loadFilesFromDir(dir, (path) => {
      loadEvents(path, collection, type);
    });
  });

  printTable(events);
  console.log('[FILESYSTEM] Filesystem has been loaded.');
};