module.exports = {
  async noAvailableCallsignError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu a fost gasit nici un callsign disponibil pentru gradul respectiv.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
