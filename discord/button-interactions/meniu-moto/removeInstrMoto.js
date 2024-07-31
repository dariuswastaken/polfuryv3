module.exports = {
  name: 'moto-menu-remove-instr',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await utils.discord.modals.displayInstrMenuCallsignInputModal(
      pulsar,
      interaction,
      'moto',
      'Scoatere'
    );
  }
};
