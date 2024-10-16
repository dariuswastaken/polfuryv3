//import mongo from '../../../src/mongo/mongoQueries.js';
const mongo = {}

export default {
  name: 'stringSelectMenuInteractionHandler',
  type: 'interactionBased',
  enabled: true,
  async execute(Pulsar, utils, botconfig) {
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
          await selectMenu.execute(pulsar, interaction, mongo, utils, botconfig);
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
          await selectMenu.execute(pulsar, interaction, mongo, utils, botconfig);
          return;
        }
      } catch (err) {
        console.error(`[STRING SELECT MENU INTERACTION EVENT ERROR] ${err}\n${err.stack}`);
      }
    });
  }
};
