module.exports = {
  sendSuccessEmbed: async (message, { pulsar, interaction }) => {
    await pulsar.discordManager.embeds.createSuccessEmbed(
      'Succes',
      `${message}`,
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  
  sendWarningEmbed: async (message, { pulsar, interaction }) => {
    await pulsar.discordManager.embeds.createWarningEmbed(
      'Atentie',
      `${message}`,
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
