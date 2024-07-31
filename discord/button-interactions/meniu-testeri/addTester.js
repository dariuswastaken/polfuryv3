module.exports = {
  name: 'tester-menu-add-instr',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await utils.discord.modals.displayInstrMenuCallsignInputModal(
      pulsar,
      interaction,
      'tester',
      'Adaugare'
    );
  }
};
