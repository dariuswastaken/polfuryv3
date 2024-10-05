module.exports = {
  async noUpListError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu exista lista de UP pentru saptamana respectiva.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async noOutListError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu exista lista de OUT pentru saptamana respectiva.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async listAlreadyExistsError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Listele pentru saptamana respectiva au fost deja generate.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async noListsError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu exista liste pentru saptamana respectiva.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
