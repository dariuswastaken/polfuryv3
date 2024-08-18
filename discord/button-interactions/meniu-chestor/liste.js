module.exports = {
  name: 'chestor-liste',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    await utils.discord.selectMenus.sendListWeekChoiceMenu({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo
    });
  }
};
