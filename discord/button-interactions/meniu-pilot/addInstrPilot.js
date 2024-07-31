module.exports = {
  name: 'pilot-menu-add-instr',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await utils.discord.modals.displayInstrMenuCallsignInputModal(
      pulsar,
      interaction,
      'pilot',
      'Adaugare'
    );
  }
};
