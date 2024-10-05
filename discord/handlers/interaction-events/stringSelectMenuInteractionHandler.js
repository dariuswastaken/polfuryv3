const mongo = require('../../../src/mongo/mongoQueries.js');
const path = require('path');

module.exports = {
  name: 'stringSelectMenuInteractionHandler',
  type: 'interactionBased',
  enabled: true,
  async execute(Pulsar) {
    Pulsar().client.on('interactionCreate', async (interaction) => {
      if (interaction.user.bot) return;
      if (!interaction.isStringSelectMenu()) return;

      const client = Pulsar().client;

      const pulsar = {
        client: client,
        config: await Pulsar().config(),
        webManager: Pulsar().webManager.createInstance(),
        utilsManager: Pulsar().utilsManager.createInstance(),
        discordManager: Pulsar().discordManager.createInstance(),
        fileManager: Pulsar().fileManager.createInstance()
      };

      const call = path.resolve(__dirname);
      const utils = Pulsar().utilsManager.createNew(
        call,
        '../../src/utils/exports/globalExports.js'
      );

      try {
        const dynamicIDslash = interaction.customId.split('/')[0];
        if (client.collections.stringSelectMenuInteractionEvents.has(interaction.customId)) {
          const selectMenu = await client.collections.stringSelectMenuInteractionEvents.get(interaction.customId)
          if(selectMenu.enabled === false && interaction.user.id !== "1027526587031232552") {
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
          await selectMenu.execute(pulsar, interaction, mongo, utils);
          return;
        }
        if (client.collections.stringSelectMenuInteractionEvents.has(dynamicIDslash)) {
          const selectMenu = await client.collections.stringSelectMenuInteractionEvents.get(dynamicIDslash)
          if(selectMenu.enabled === false && interaction.user.id !== "1027526587031232552") {
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
          await selectMenu.execute(pulsar, interaction, mongo, utils);
          return;
        }
      } catch (err) {
        console.error(`[STRING SELECT MENU INTERACTION EVENT ERROR] ${err}\n${err.stack}`);
      }
    });
  }
};
