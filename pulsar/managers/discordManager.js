import * as discordFunctions from '../exports/discord.js';

const discordManager = {
    createInstance: () => {
        return {
            embeds: discordFunctions.embeds,
            menus: discordFunctions.menus,
            modals: discordFunctions.modals
        };
    }
};

export default discordManager;
