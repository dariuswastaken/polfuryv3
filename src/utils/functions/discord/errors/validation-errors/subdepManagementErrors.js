module.exports = {
  alreadyHasFuncError: async (pulsar, interaction) => {
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
  
  doesNotHaveFuncError: async (pulsar, interaction) => {
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
  
  invalidFuncRankError: async (pulsar, interaction) => {
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
