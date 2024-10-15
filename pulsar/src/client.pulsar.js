import { utilsManager } from '../managers/utilsManager';
import { discordManager } from '../managers/discordManager';
import { fileManager } from '../managers/fileManager';
import { processManager } from '../managers/processManager';
import { webManager } from '../managers/webManager';
import clients from '../exports/clients';
import config from '../.config/config.json';

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
