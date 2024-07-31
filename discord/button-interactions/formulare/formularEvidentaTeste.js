module.exports = {
  name: 'formular-trecere-test',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await utils.discord.modals.displayFormularTrecereTest(
      pulsar,
      interaction,
      interaction.user.id
    );
  }
};
