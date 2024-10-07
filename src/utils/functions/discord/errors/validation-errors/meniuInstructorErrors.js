module.exports = {
  alreadyHasCertificateError: async (pulsar, interaction) => {
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
  
  doesNotHaveCertificateError: async (pulsar, interaction) => {
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
  
  alreadyHasCooldownError: async (pulsar, interaction) => {
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
  
  noCooldownsError: async (pulsar, interaction) => {
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
