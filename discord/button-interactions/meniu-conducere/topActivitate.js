export default {
  name: 'top-activitate',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils, botconfig) {
    await interaction.deferReply({ ephemeral: true });

    await utils.discord.buttonMenus.sendActivityTopStatsMenu(
      {
        pulsar: pulsar,
        interaction: interaction
      },
      botconfig
    );
  }
};
