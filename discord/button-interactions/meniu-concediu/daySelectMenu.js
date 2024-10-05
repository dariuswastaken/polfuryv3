module.exports = {
  name: 'meniu-concediu',
  enabled: false,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const profile = await mongo.getProfile(interaction.user.id);
    if (!profile) {
      await utils.discord.errors.noProfileError(pulsar, interaction);
      return;
    }

    await  utils.discord.buttonMenus.sendMenuConcediu({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo
    });
  }
};
