module.exports = {
  async noPermissionError(pulsar, interaction) {
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
  async selfError(pulsar, interaction) {
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
  async roleHierarchyError(pulsar, interaction) {
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
  async selfUseError(pulsar, interaction) {
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
  async invalidSanctionPermError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu poti deschide un thread pe aceasta persoana.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
