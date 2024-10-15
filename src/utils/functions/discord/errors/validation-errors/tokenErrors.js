export const invalidTokenError = async (pulsar, interaction) => {
  pulsar.discordManager.embeds.createErrorEmbed(
    'Eroare',
    'Token-ul introdus este invalid.',
    {
      interaction: interaction,
      ephemeral: true,
      deferReply: true
    }
  );
};
