module.exports = {
  name: 'activitate-membru',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const userActivity = await mongo.getAllActivity(interaction.user.id);

    const hasProfile = await utils.discord.cmds.validateProfile(interaction.user.id, mongo);
    if (!hasProfile) {
      await utils.discord.errors.noProfileError(pulsar, interaction);
      return;
    }

    if (!userActivity || userActivity.length === 0) {
      await utils.discord.errors.noActivityError(pulsar, interaction);
      return;
    }

    await utils.discord.selectMenus.sendActivityWeekChoiceMenu({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo,
      targetID: interaction.user.id
    });
  }
};
