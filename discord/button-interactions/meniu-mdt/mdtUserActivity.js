export default {
  name: 'mdt-menu-user-activity',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await utils.discord.modals.displayInstrActivityCallsignInputModal(
      pulsar,
      interaction,
      'mdt'
    );
  }
};
