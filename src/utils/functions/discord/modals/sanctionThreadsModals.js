module.exports = {
  async displaySanctionCallsignInputModal(pulsar, interaction) {
    const modal = await pulsar.discordManager.modals.createModal({
      id: `modal-sanction-callsign-input`,
      title: 'Threads Sanctiuni | Callsign',
      inputs: [
        {
          id: 'm-sanction-callsign-input',
          label: 'Callsign',
          placeholder: 'Introdu callsign-ul persoanei sanctionate',
          style: 'Short',
          required: true
        }
      ]
    });

    await interaction.showModal(modal);
  },
  async displaySanctionMotivInputModal(pulsar, interaction, sanctionID) {
    const modal = await pulsar.discordManager.modals.createModal({
      id: `modal-sanction-reason-input/${sanctionID}`,
      title: 'Threads Sanctiuni | Motiv',
      inputs: [
        {
          id: 'm-sanction-reason-input',
          label: 'Motiv',
          placeholder: 'Introdu motivul sanctiunii',
          style: 'Paragraph',
          required: true
        }
      ]
    });

    await interaction.showModal(modal);
  }
};