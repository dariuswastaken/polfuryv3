const {
  registerApplicationCommands
} = require('../../../src/handlers/restHandler.js');

module.exports = {
  name: 'onLogin',
  async execute(Pulsar) {
    Pulsar().client.on('ready', async () => {
      try {
        console.log('[DISCORD API] Connected to Discord API.');
        await registerApplicationCommands();
      } catch (err) {
        console.error(err);
      }
    });
  }
};
