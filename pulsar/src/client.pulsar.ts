import utilsManager from '../managers/utilsManager.ts';
import discordManager from '../managers/discordManager.ts';
import fileManager from '../managers/fileManager.ts';
import processManager from '../managers/processManager.ts';
import webManager from '../managers/webManager.ts';
import * as clients from '../exports/clients.ts';
import config from '../.config/config.json' with { type: 'json' };

export default class PulsarClient {
    public mongoClient: any;
    public createDiscordClient: any;
    public utilsManager: any;
    public discordManager: any;
    public fileManager: any;
    public processManager: any;
    public webManager: any;

    private static instance: PulsarClient;

    private constructor() {
        this.mongoClient = clients.mongoClient;
        this.createDiscordClient = clients.createDiscordClient;
        this.utilsManager = utilsManager;
        this.discordManager = discordManager;
        this.fileManager = fileManager;
        this.processManager = processManager;
        this.webManager = webManager;
    }

    public static getInstance(): PulsarClient {
        if (!PulsarClient.instance) {
            PulsarClient.instance = new PulsarClient();
        }
        return PulsarClient.instance;
    }

    async config() {
        return config.pulsar;
    }
}
