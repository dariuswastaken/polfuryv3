module.exports = {
  name: 'chestor-creare-lista',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    await utils.discord.selectMenus.sendWeekChoiceMenu({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo
    });
  }
};
