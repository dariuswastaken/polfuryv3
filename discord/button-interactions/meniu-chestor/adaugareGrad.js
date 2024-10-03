module.exports = {
  name: 'chestor-adauga-ci',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const targetID = interaction.customId.split('/')[1];

    await utils.discord.selectMenus.sendChestorRankChoiceMenu({
      pulsar: pulsar,
      interaction: interaction,
      targetID: targetID
    });
  }
};
