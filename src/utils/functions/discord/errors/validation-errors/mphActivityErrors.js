export const alreadyInMotoSessionError = async (pulsar, interaction) => {
  pulsar.discordManager.embeds.createErrorEmbed(
    'Eroare',
    'Ai deja un motor activ.',
    {
      interaction: interaction,
      ephemeral: true,
      deferReply: true
    }
  );
};

export const alreadyInHighspeedSessionError = async (pulsar, interaction) => {
  pulsar.discordManager.embeds.createErrorEmbed(
    'Eroare',
    'Ai deja o masina activa.',
    {
      interaction: interaction,
      ephemeral: true,
      deferReply: true
    }
  );
};

export const alreadyInPilotSessionError = async (pulsar, interaction) => {
  pulsar.discordManager.embeds.createErrorEmbed(
    'Eroare',
    'Ai deja un elicopter activ.',
    {
      interaction: interaction,
      ephemeral: true,
      deferReply: true
    }
  );
};

export const noMotoCertificateError = async (pulsar, interaction) => {
  pulsar.discordManager.embeds.createErrorEmbed(
    'Eroare',
    'Nu detii certificatul **MOTO**.',
    {
      interaction: interaction,
      ephemeral: true,
      deferReply: true
    }
  );
};

export const noHighspeedCertificateError = async (pulsar, interaction) => {
  pulsar.discordManager.embeds.createErrorEmbed(
    'Eroare',
    'Nu detii certificatul **HIGHSPEED**.',
    {
      interaction: interaction,
      ephemeral: true,
      deferReply: true
    }
  );
};

export const noPilotCertificateError = async (pulsar, interaction) => {
  pulsar.discordManager.embeds.createErrorEmbed(
    'Eroare',
    'Nu detii certificatul **PILOT**.',
    {
      interaction: interaction,
      ephemeral: true,
      deferReply: true
    }
  );
};
