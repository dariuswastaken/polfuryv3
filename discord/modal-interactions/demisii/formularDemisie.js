export default {
  name: 'modal-formular-demisie',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const reason = await interaction.fields.getTextInputValue(
      'form-demisie-motiv'
    );
    const user = await interaction.guild.members.fetch(interaction.user.id);

    const profile = await mongo.getProfile(interaction.user.id);
    if (!profile) {
      await utils.discord.errors.noProfileError(pulsar, interaction);
      return;
    }

    await mongo.deleteProfile(interaction.user.id);
    await mongo.updateCallsign(profile.grad, profile.callsign, false);
    await user.kick('Demisie');

    const [day, month, year] = await profile.dataIntrare.split('.');
    const dataIntrareF = `${year}-${month}-${day}`;

    const dataIntrare = new Date(dataIntrareF);
    const dataDemisie = new Date();

    const diffInDays = await utils.dayConversion.getDifferenceInDays(
      dataIntrare,
      dataDemisie
    );

    const logUID = await pulsar.utilsManager.uniques.createUniqueID();
    await utils.discord.logging.createLog(
      {
        pulsar: pulsar,
        interaction: interaction,
        utils: utils,
        mongo: mongo,
        channel: '1194276839770816552',
        fields: [
          {
            name: 'Membru',
            value: `${profile.nume} (${interaction.user.id})`,
            inline: true
          },
          {
            name: 'Grad',
            value: `${profile.grad}`,
            inline: true
          },
          {
            name: 'ID',
            value: `${profile.IDServer}`,
            inline: true
          },
          {
            name: 'Data Intrare',
            value: `${profile.dataIntrare}`,
            inline: true
          },
          {
            name: 'Zile petrecute in departament',
            value: `${diffInDays}`,
            inline: true
          },
          {
            name: 'Motiv',
            value: `${reason}`,
            inline: true
          }
        ],
        type: 'DEMISIE'
      },
      {
        tip_: 'demisie',
        id: logUID,
        data: {
          authorID: interaction.user.id,
          nume: profile.nume,
          grad: profile.grad,
          callsign: profile.callsign,
          dataIntrare: profile.dataIntrare,
          zilePetrecute: diffInDays,
          IDServer: profile.IDServer,
          reason: reason,
          date: new Date()
        }
      }
    );
  }
};
