import mongo from '../../../src/mongo/mongoQueries.js';
import utils from '../../../src/utils/exports/globalExports.js';

export default {
  name: 'buttonInteractionEventHandler',
  type: 'interactionBased',
  enabled: true,
  async execute(Pulsar) {
    Pulsar().client.on('interactionCreate', async (interaction) => {
      if (interaction.user.bot) return;
      if (!interaction.isButton()) return;

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
        let dynamicIDslash = interaction.customId.split('/')[0];

        if (client.collections.buttonInteractionEvents.has(interaction.customId)) {
          try {
            const button = await client.collections.buttonInteractionEvents.get(interaction.customId)
            if(button.enabled === false && interaction.user.id !== "1027526587031232552") {
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
            await button.execute(pulsar, interaction, mongo, utils);
            console.log(
              `[BUTTON INTERACTION EVENT] Button interaction: ${interaction.customId} executed by ${interaction.user.username}`
            )
            return;
          } catch (error) {
            console.error(
              `[BUTTON INTERACTION EVENT ERROR] Button interaction: ${interaction.customId} failed to execute by ${interaction.user.username}\n${error.stack}`
            );
          }
        }

        if (client.collections.buttonInteractionEvents.has(dynamicIDslash)) {
          try {
            const button = await client.collections.buttonInteractionEvents.get(dynamicIDslash)
            if(button.enabled === false && interaction.user.id !== "1027526587031232552") {
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
            await button.execute(pulsar, interaction, mongo, utils);
            console.log(
              `[BUTTON INTERACTION EVENT] Button interaction: ${dynamicIDslash} executed by ${interaction.user.username}`
            );
            return;
          } catch (error) {
            console.error(
              `[BUTTON INTERACTION EVENT ERROR] Button interaction: ${dynamicIDslash} failed to execute by ${interaction.user.username}\n${error.stack}`
            );
          }
        }
      } catch (err) {
        console.error(`[BUTTON INTERACTION EVENT ERROR] ${err}\n${err.stack}`);
      }
    });
  }
};
