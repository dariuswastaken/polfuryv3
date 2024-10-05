module.exports = {
  async sendActivityUpdateRetryEmbed(message, { pulsar, interaction }) {
    await pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      `${message}`,
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
