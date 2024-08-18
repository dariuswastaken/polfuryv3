module.exports = {
  name: 'chestor-stergere-lista',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    await utils.discord.selectMenus.sendListDeleteWeekChoiceMenu({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo
    });
  }
};
