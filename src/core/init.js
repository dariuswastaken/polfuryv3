const fileHandler = require('../handlers/fileHandler');
const { Pulsar } = require('../../pulsar/index.pulsar.js');
const client = Pulsar().client;
const fileManager = Pulsar().fileManager.createInstance();
const processManager = Pulsar().processManager.createInstance();

module.exports = {
  readyState: 0,
  init: function () {
    try {
      if (this.readyState === 1)
        throw new Error('[INIT] readyState is set to 1, cannot init again');
      this.readyState = 1;
      fileManager.createCacheManager();
      processManager.createErrorHandler();

      fileHandler.loadFilesystem();

      client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
      console.error(error);
      this.readyState = 0;
    }
  }
};
