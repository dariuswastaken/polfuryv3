const { utilsManager } = require('../managers/utilsManager');
const { discordManager } = require('../managers/discordManager');
const { fileManager } = require('../managers/fileManager');
const { processManager } = require('../managers/processManager');
const { webManager } = require('../managers/webManager');
const clients = require('../exports/clients');
const config = require('../.config/config.json');

module.exports.PulsarClient = class PulsarClient {
  constructor() {
    this.MongoClient = clients.MongoClient;
    this.client = clients.client;
    this.utilsManager = utilsManager;
    this.discordManager = discordManager;
    this.fileManager = fileManager;
    this.processManager = processManager;
    this.webManager = webManager;
  }
  async config() {
    return config.pulsar;
  }
};
