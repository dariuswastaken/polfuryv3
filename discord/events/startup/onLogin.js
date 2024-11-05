import { registerApplicationCommands } from '../../../src/handlers/restHandler.js';

export default {
    name: 'onLogin',
    async execute(Pulsar) {
        Pulsar.client.on('ready', async () => {
            try {
                console.log('[DISCORD API] Connected to Discord API.');
                await registerApplicationCommands();
            } catch (err) {
                console.error(err);
            }
        });
    }
};
