module.exports = {
  name: 'sanction-thread-send',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    if (!interaction.user.roles.cache.has(['1119645178148442152'])) {
      await utils.discord.errors.sanctionPermError(pulsar, interaction);
      return;
    }
    
    const sanctionID = interaction.customId.split('/')[1];

    const sanction = await mongo.getSanction(sanctionID);
    if (sanction.active === false) {
      await utils.discord.errors.threadClosedError(pulsar, interaction);
      return;
    }

    const formattedSanctionList = [];
    for (let sanc of sanction.sanctions) {
      formattedSanctionList.push(sanc.split(' - ')[0]);
    }

    if (formattedSanctionList.includes('demitere')) {
    } else if (formattedSanctionList.includes('down')) {
    } else {
      await utils.discord.quickFunctions.createSanctionPrivateChannel({
        pulsar: pulsar,
        interaction: interaction,
        mongo: mongo,
        sanctionID: sanctionID
      });
      await utils.discord.quickFunctions.addSanctionToMember({
        pulsar: pulsar,
        mongo: mongo,
        userID: sanction.sanctionedID,
        sanctions: sanction.sanctions
      });

      await mongo.closeSanction(sanctionID);

      await utils.discord.embeds.sendSuccessEmbed(
        'Sanctiunea a fost acordata, thread-ul a fost marcat ca si **INCHIS**.',
        {
          pulsar: pulsar,
          interaction: interaction
        }
      );
    }
  }
};
