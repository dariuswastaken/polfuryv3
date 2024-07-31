module.exports = {
  name: 'formular-demisie',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await utils.discord.modals.displayFormularDemisie(
      pulsar,
      interaction,
      interaction.user.id
    );
  }
};
