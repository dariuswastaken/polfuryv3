import discordFunctions from '../exports/discord.js';

module.exports = {
  discordManager: {
    createInstance: () => {
      return {
        embeds: discordFunctions.embeds,
        menus: discordFunctions.menus,
        messages: discordFunctions.messages,
        modals: discordFunctions.modals,
        roles: discordFunctions.roles
      };
    }
  }
};
