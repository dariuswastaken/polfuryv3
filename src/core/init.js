import * as fileHandler from '../handlers/fileHandler.js';
import { Pulsar } from '../../pulsar/index.pulsar.js';

const client = Pulsar().client;
const fileManager = Pulsar().fileManager.createInstance();
const processManager = Pulsar().processManager.createInstance();

let readyState = 0;

const init = {
  trigger: async () => {
    try {
      if (readyState === 1) {
        throw new Error('[INIT] readyState is set to 1, cannot init again');
      }
      readyState = 1;

      await fileManager.createLogsManager();
     //await processManager.createErrorHandler();
      
      await fileHandler.loadHandlers();
      await fileHandler.loadBaseFilesystem();

      client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
      console.error(error);
      readyState = 0;
      return this;
    }
  }
};

export default init;
