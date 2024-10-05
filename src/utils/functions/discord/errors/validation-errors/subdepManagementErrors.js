module.exports = {
  async alreadyHasFuncError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Membrul respectiv detine deja aceasta functie.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async doesNotHaveFuncError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Membrul respectiv nu detine aceasta functie.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async invalidFuncRankError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Functiile pot fi adaugate doar persoanelor cu gradul de **Agent+**.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
