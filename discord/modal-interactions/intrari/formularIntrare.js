module.exports = {
  name: 'modal-formular-intrare',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const validate = await utils.discord.validate.formIntrare({
      pulsar: pulsar,
      interaction: interaction,
      utils: utils,
      mongo: mongo
    });
    if (validate === 'invalid') return;

    const inputToken = await interaction.fields.getTextInputValue(
      'form-intrare-token'
    );
    const token = await mongo.getToken(inputToken);

    if (token.type === 'default') {
      await utils.discord.quickFunctions.addAcademiePD({
        interaction: interaction,
        mongo: mongo,
        targetID: interaction.user.id,
        data: {
          nume: validate.formattedName,
          IDDiscord: interaction.user.id,
          IDServer: validate.serverID,
          dataIntrare: new Date(),
          dataActualizare: new Date()
        }
      });
      await utils.discord.embeds.sendSuccessEmbed(
        'Ai fost inregistrat cu succes ca si academician.',
        {
          pulsar: pulsar,
          interaction: interaction
        }
      );
    } else if (token.type === 'reintegrare') {
      const currentDate = await utils.dayConversion.getCurrentDate();

      await utils.discord.quickFunctions.addReintegrarePD({
        interaction: interaction,
        mongo: mongo,
        targetID: interaction.user.id,
        data: {
          nume: validate.formattedName,
          IDDiscord: interaction.user.id,
          IDServer: validate.serverID,
          dataIntrare: currentDate,
          dataActualizare: currentDate
        }
      });

      await utils.discord.embeds.sendSuccessEmbed(
        'Ai fost inregistrat cu succes ca si AGENT.',
        {
          pulsar: pulsar,
          interaction: interaction
        }
      );
    }

    const logUID = await pulsar.utilsManager.uniques.createUniqueID();
    await utils.discord.logging.createLog(
      {
        pulsar: pulsar,
        interaction: interaction,
        utils: utils,
        mongo: mongo,
        channel: '1194277119291834378',
        fields: [
          {
            name: 'Membru',
            value: `${validate.formattedName} (${interaction.user.id})`,
            inline: true
          },
          {
            name: 'ID',
            value: `${validate.serverID}`,
            inline: true
          },
          {
            name: 'Tip',
            value: `${token.type}`,
            inline: true
          }
        ],
        type: 'INTRARE'
      },
      {
        tip_: 'intrare',
        id: logUID,
        data: {
          tokenAuthorID: token.author,
          nume: validate.formattedName,
          IDServer: validate.serverID,
          discordID: interaction.user.id,
          date: new Date(),
          type: token.type
        }
      }
    );
  }
};
