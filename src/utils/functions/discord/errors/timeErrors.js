export const tokenExpiredError = async (pulsar, interaction) => {
  pulsar.discordManager.embeds.createErrorEmbed(
    'Eroare',
    'Token-ul este expirat.',
    {
      interaction: interaction,
      ephemeral: true,
      deferReply: true
    }
  );
};
