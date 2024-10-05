module.exports = {
  async sendSuccessEmbed(message, { pulsar, interaction }) {
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
  async sendWarningEmbed(message, { pulsar, interaction }) {
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
