export default {
  name: 'top-stats',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils, botconfig) {
    await interaction.deferReply({ ephemeral: true });

    const type = interaction.customId.split('/')[1];

    await utils.discord.selectMenus.sendWeekChoiceMenu({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo,
      type: type,
      title: 'Meniu Selectare Top Activitate'
    });
  }
};
