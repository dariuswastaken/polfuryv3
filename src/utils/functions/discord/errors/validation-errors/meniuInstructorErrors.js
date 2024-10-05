module.exports = {
  async alreadyHasCertificateError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Membrul respectiv detine deja acest certificat.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async doesNotHaveCertificateError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Membrul respectiv nu detine acest certificat.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async alreadyHasCooldownError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Membrul respectiv are deja un cooldown.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async noCooldownsError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Membrul respectiv nu are cooldown-uri active.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
