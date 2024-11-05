import * as fileHandler from '../handlers/fileHandler.js';
import pulsarInstance from './pulsarInstance.js';
import 'jsr:@std/dotenv/load';
import client from './client.js';
import pulsarInstance from './pulsarInstance.js';

const fileManager = pulsarInstance.fileManager.createInstance();
const processManager = pulsarInstance.fileManager.createInstance();

let readyState = 0;

const init = {
    trigger: async () => {
        try {
            if (readyState === 1) {
                throw new Error('[INIT] readyState is set to 1, cannot init again');
            }
            readyState = 1;

            await fileManager.createLogsManager();
            await processManager.createErrorHandler();

            await fileHandler.loadHandlers();
            await fileHandler.loadBaseFilesystem();

            client.login(Deno.env.get('DISCORD_TOKEN'));
        } catch (error) {
            console.error(error);
            readyState = 0;
            return this;
        }
    }
};

export default init;
