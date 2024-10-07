module.exports = {
  noDaysLeftError: async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu poti adauga mai multe zile.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  
  hasDayAlreadyError: async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Ai deja concediu in ziua respectiva.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  
  noLeaveError: async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu ai nici o zi de concediu.',
      {
        interaction: interaction,
        ephemeral: true
      }
    );
  }
};
