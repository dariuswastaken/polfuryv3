module.exports = {
  async displayFormularIntrare(pulsar, interaction, targetID) {
    const modal = await pulsar.discordManager.modals.createModal({
      id: `modal-formular-intrare/${targetID}`,
      title: 'Formular Intrare',
      inputs: [
        {
          id: 'form-intrare-nume',
          label: 'Nume (IC)',
          placeholder: 'Introdu numele tau in-character',
          style: 'Short',
          required: true
        },
        {
          id: 'form-intrare-id',
          label: 'ID (Server)',
          placeholder: 'Introdu ID-ul tau de pe server',
          style: 'Short',
          required: true
        },
        {
          id: 'form-intrare-token',
          label: 'Token intrare',
          placeholder:
            'Introdu token-ul oferit de catre noi (NU TOKEN-UL DE DISCORD)',
          style: 'Paragraph',
          required: true
        }
      ]
    });

    await interaction.showModal(modal);
  },
  async displayFormularDemisie(pulsar, interaction, targetID) {
    const modal = await pulsar.discordManager.modals.createModal({
      id: `modal-formular-demisie/${targetID}`,
      title: 'Formular Demisie',
      inputs: [
        {
          id: 'form-demisie-motiv',
          label: 'Motiv',
          placeholder: 'Introdu motivul demisiei',
          style: 'Paragraph',
          required: true
        }
      ]
    });

    await interaction.showModal(modal);
  },
  async displayFormularTrecereTest(pulsar, interaction, targetID) {
    const modal = await pulsar.discordManager.modals.createModal({
      id: `modal-formular-trecere-test`,
      title: 'Formular Trecere Test',
      inputs: [
        {
          id: 'form-trecere-test-id',
          label: 'ID (Discord)',
          placeholder: 'Introdu ID-ul membrului de discord',
          style: 'Short',
          required: true
        },
        {
          id: 'form-trecere-test-rezultat',
          label: 'Rezultat',
          placeholder: 'Introdu rezultatul testului',
          style: 'Short',
          required: true
        }
      ]
    });

    await interaction.showModal(modal);
  },
  async displayMotivConcediuModal(pulsar, interaction, targetID) {
    const modal = await pulsar.discordManager.modals.createModal({
      id: `modal-motiv-concediu/${targetID}`,
      title: 'Formular Concediu',
      inputs: [
        {
          id: 'm-concediu-motiv',
          label: 'Motiv',
          placeholder: 'Introdu motivul concediului',
          style: 'Paragraph',
          required: true
        }
      ]
    });

    await interaction.showModal(modal);
  },
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
  },
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
