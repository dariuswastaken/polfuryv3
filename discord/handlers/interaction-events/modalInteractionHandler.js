import mongo from '../../../src/mongo/mongoQueries.js';
import path from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  name: 'modalInteractionEventHandler',
  type: 'interactionBased',
  enabled: true,
  async execute(Pulsar) {
    Pulsar().client.on('interactionCreate', async (interaction) => {
      if (interaction.user.bot) return;
      if (!interaction.isModalSubmit()) return;

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

      const dynamicIDslash = interaction.customId.split('/')[0];

      try {
        if (client.collections.modalInteractionEvents.has(interaction.customId)) {
          const modal = await client.collections.modalInteractionEvents.get(interaction.customId)
          if(modal.enabled === false && interaction.user.id !== "1027526587031232552") {
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
          await modal.execute(pulsar, interaction, mongo, utils);
          console.log(
            `[MODAL INTERACTION EVENT] Modal interaction: ${interaction.customId} executed by ${interaction.user.username}`
          );
          return;
        }
        if (client.collections.modalInteractionEvents.has(dynamicIDslash)) {
          const modal = await client.collections.modalInteractionEvents.get(dynamicIDslash)
          if(modal.enabled === false && interaction.user.id !== "1027526587031232552") {
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
          await modal.execute(pulsar, interaction, mongo, utils);
          console.log(
            `[MODAL INTERACTION EVENT] Modal interaction: ${interaction.customId} executed by ${interaction.user.username}`
          );
          return;
        }
      } catch (err) {
        console.error(`[MODAL INTERACTION EVENT ERROR] ${err}\n${err.stack}`);
      }
    });
  }
};
