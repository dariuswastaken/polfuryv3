module.exports = {
  async invalidDiscordIdError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Acel ID de discord nu exista sau persoana nu este pe server.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
