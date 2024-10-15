import { utilsManager } from '../managers/utilsManager.js';
import { discordManager } from '../managers/discordManager.js';
import { fileManager } from '../managers/fileManager.js';
import { processManager } from '../managers/processManager.js';
import { webManager } from '../managers/webManager.js';
import * as clients from '../exports/clients.js';
import config from '../.config/config.json' with { type: 'json' };

export default class PulsarClient {
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
}
