module.exports = {
  async noSnapshotsError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu exista snapshot-uri pentru persoana respectiva.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
