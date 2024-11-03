import * as discordFunctions from '../exports/discord.ts';
import { Manager } from '../interfaces/base/managers.interfaces.ts';
import { DiscordInstance } from '../interfaces/managerInterfaces/discordManager.interfaces.ts'; 

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
