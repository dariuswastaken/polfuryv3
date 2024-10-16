export default {
  name: 'contextMenuHandler',
  type: 'interactionBased',
  enabled: true,
  async execute(Pulsar, utils, botconfig, mongo) {
    Pulsar().client.on('interactionCreate', async (interaction) => {
      if (interaction.user.bot) return;

      const client = Pulsar().client;
      
      const pulsar = {
        client: client,
        config: await Pulsar().config(),
        webManager: Pulsar().webManager.createInstance(),
        utilsManager: Pulsar().utilsManager.createInstance(),
        discordManager: Pulsar().discordManager.createInstance(),
        fileManager: Pulsar().fileManager.createInstance()
      };

      if (!interaction.isUserContextMenuCommand() && !interaction.isMessageContextMenuCommand())
        return;

      const { commandName } = interaction;
      
      try {
        if (interaction.isUserContextMenuCommand()) {
          if (client.collections.contextMenus.has(commandName)) {
            const contextMenu = await client.collections.contextMenus.get(commandName)
            if(contextMenu.enabled === false && interaction.user.id !== "1027526587031232552") {
              await pulsar.discordManager.embeds.createErrorEmbed(
                'Eroare',
                `Aceasta optiune este dezactivata.`,
                {
                  interaction: interaction,
                  ephemeral: true,
                }
              );
              return;
            }
            await contextMenu.execute(pulsar, interaction, mongo, utils, botconfig);
          }
          console.log(
            `[CONTEXT MENU EVENT] User context menu command: ${commandName} executed by ${
              interaction.user.username
            } on user ${interaction.options.getUser('user').username}`
          );
          return;
        }

        if (interaction.isMessageContextMenuCommand()) {
          if (client.collections.contextMenus.has(commandName)) {
            const contextMenu = await client.collections.contextMenus.get(commandName)
            if(contextMenu.enabled === false && interaction.user.id !== "1027526587031232552") {
              await pulsar.discordManager.embeds.createErrorEmbed(
                'Eroare',
                `Aceasta optiune este dezactivata.`,
                {
                  interaction: interaction,
                  ephemeral: true,
                }
              );
              return;
            }
            await contextMenu.execute(pulsar, interaction, mongo, utils, botconfig);
          }
          console.log(
            `[CONTEXT MENU EVENT] Message context menu command: ${commandName} executed by ${
              interaction.user.username
            } on message ${interaction.options.getMessage('message').id}`
          );
          return;
        }
      } catch (err) {
        console.error(`[CONTEXT MENU ERROR] ${err}\n${err.stack}`);
      }
    });
  }
};
