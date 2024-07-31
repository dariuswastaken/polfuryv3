module.exports = {
  name: 'adaugare-certificat-select',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const certificat = interaction.values[0];
    const targetID = interaction.customId.split('/')[1];

    const targetProfile = await mongo.getProfile(targetID);
    const instructorProfile = await mongo.getProfile(interaction.user.id);

    const hasCertificate = await mongo.hasCertificate(targetID, certificat);

    if (hasCertificate) {
      await utils.discord.errors.alreadyHasCertificateError(
        pulsar,
        interaction
      );
      return;
    }

    await utils.quickFunctions.addCertificat({
      interaction: interaction,
      mongo: mongo,
      targetID: targetID,
      certificat: certificat
    });

    await utils.discord.embeds.sendSuccessEmbed(
      `Certificatul **${certificat.toUpperCase()}** a fost oferit cu succes.`,
      {
        pulsar: pulsar,
        interaction: interaction
      }
    );

    const logUID = await pulsar.utilsManager.uniques.createUniqueID();
    await utils.discord.logging.createLog(
      {
        pulsar: pulsar,
        interaction: interaction,
        utils: utils,
        mongo: mongo,
        channel: '1194277120977928282',
        fields: [
          {
            name: 'Instructor',
            value: `${instructorProfile.nume} (${interaction.user.id})`,
            inline: true
          },
          {
            name: 'Oferit lui',
            value: `${targetProfile.nume} (${targetID})`,
            inline: true
          },
          {
            name: 'Certificat',
            value: `${certificat.toUpperCase()}`,
            inline: true
          }
        ],
        type: 'ADAUGARE CERTIFICAT'
      },
      {
        tip_: 'adaugareCertificat',
        id: logUID,
        data: {
          targetID: targetID,
          authorID: interaction.user.id,
          nume: targetProfile.nume,
          certificat: certificat,
          date: new Date()
        }
      }
    );
  }
};
