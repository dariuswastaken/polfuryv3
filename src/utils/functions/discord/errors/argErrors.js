module.exports = {
  async invalidNameArgumentsError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Numele trebuie sa fie format din **Nume + Prenume**.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async invalidResultError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Rezultatul introdus nu este valid (Acceptat/Admis - Refuzat/Respins).',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async invalidReasonLengthError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Motivul trebuie sa aibe minim 5 caractere.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
