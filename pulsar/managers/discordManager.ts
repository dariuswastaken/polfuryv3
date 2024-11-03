import * as discordFunctions from '../exports/discord.js';
import { Manager } from '../interfaces/base/managers.interfaces.js';
import { DiscordInstance } from '../interfaces/managerInterfaces/discordManager.interfaces.js'; 

const discordManager: Manager<Object> = {
    createInstance: (): DiscordInstance => {
        return {
            embeds: discordFunctions.embeds,
            menus: discordFunctions.menus,
            modals: discordFunctions.modals
        };
    }
};

export default discordManager;
