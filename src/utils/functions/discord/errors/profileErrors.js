module.exports = {
  async noProfileError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Acel membru nu are un profil in baza de date.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async noActivityError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu s-a gasit activitate pentru membrul respectiv.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async userNotInAcademy(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Membrul respectiv nu face parte din academie.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
