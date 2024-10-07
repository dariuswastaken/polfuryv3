module.exports = {
  componentDisabledError: async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Acest buton nu mai poate fi folosit.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
