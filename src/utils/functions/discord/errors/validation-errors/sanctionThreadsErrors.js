module.exports = {
  async invalidCallsignError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Callsign-ul introdus nu este valid.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async noSanctionsError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Trebuie sa adaugi minim o sanctiune pentru a continua.',
      {
        interaction: interaction,
        ephemeral: true
      }
    );
  },
  async hasSanctionAlreadyError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Sanctiunea respectiva este deja adaugata.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async cannotAddSanctionError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Nu mai poti adauga sanctiuni.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async cannotCreateThreadAgainError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Acest thread nu poate fi creat din nou.',
      {
        interaction: interaction,
        ephemeral: true
      }
    );
  },
  async threadClosedError(pulsar, interaction) {
    pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      'Acest thread este inchis.',
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
