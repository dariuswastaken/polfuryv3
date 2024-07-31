module.exports = {
  name: 'moto-menu-add-instr',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await utils.discord.modals.displayInstrMenuCallsignInputModal(
      pulsar,
      interaction,
      'moto',
      'Adaugare'
    );
  }
};
