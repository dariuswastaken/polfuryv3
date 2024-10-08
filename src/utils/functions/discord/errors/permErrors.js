module.exports = {
  noPermissionError: async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu ai permisiunea necesara pentru a folosi aceasta comanda.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },

  selfError: async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu te poti demite singur/a.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },

  roleHierarchyError: async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu poti face asta pe cineva cu un rol superior sau egal.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },

  selfUseError: async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu poti folosi acest meniu pe tine.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },

  invalidSanctionPermError: async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu poti deschide un thread pe aceasta persoana.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },

  sanctionPermError: async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Doar un chestor poate trimite/anula sanctiunile.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
