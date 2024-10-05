module.exports = {
  name: 'sanction-thread-cancel',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const sanctionID = interaction.customId.split('/')[1];

    const sanction = await mongo.getSanction(sanctionID);
    if (sanction.active === false) {
      await utils.discord.errors.threadClosedError(pulsar, interaction);
      return;
    }

    await mongo.closeSanction(sanctionID);

    await utils.discord.embeds.sendSuccessEmbed('Sanctiunea a fost anulata, thread-ul a fost marcat ca si **INCHIS**.', {
      pulsar: pulsar,
      interaction: interaction
    });
  }
};
