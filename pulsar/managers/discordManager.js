import * as discordFunctions from '../exports/discord.js';

const discordManager = {
  createInstance: () => {
    return {
      embeds: discordFunctions.embeds,
      menus: discordFunctions.menus,
      messages: discordFunctions.messages,
      modals: discordFunctions.modals,
      roles: discordFunctions.roles
    };
  }
};

export default discordManager;