module.exports = {
  noUpListError: async (pulsar, interaction) => {
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
  
  noOutListError: async (pulsar, interaction) => {
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
  
  listAlreadyExistsError: async (pulsar, interaction) => {
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
  
  noListsError: async (pulsar, interaction) => {
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
