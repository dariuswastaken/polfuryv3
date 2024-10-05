module.exports = {
  async displayInstrMenuCallsignInputModal(pulsar, interaction, subdep, type) {
    const modal = await pulsar.discordManager.modals.createModal({
      id: `modal-${subdep}-instr-${type.toLowerCase()}`,
      title: `Meniu ${subdep.toUpperCase()} | ${type} Instructor`,
      inputs: [
        {
          id: `m-instr-${subdep}-callsign-input`,
          label: 'Callsign',
          placeholder: 'Introdu callsign-ul',
          style: 'Short',
          required: true
        }
      ]
    });

    await interaction.showModal(modal);
  },
  async displayInstrActivityCallsignInputModal(pulsar, interaction, subdep) {
    const modal = await pulsar.discordManager.modals.createModal({
      id: `modal-${subdep}-instr-activity`,
      title: `Meniu ${subdep.toUpperCase()} | Activitate`,
      inputs: [
        {
          id: `m-instr-activity-${subdep}-callsign-input`,
          label: 'Callsign',
          placeholder: 'Introdu callsign-ul',
          style: 'Short',
          required: true
        }
      ]
    });

    await interaction.showModal(modal);
  }
};
