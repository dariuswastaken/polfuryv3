export const displayMotivConcediuModal = async (pulsar, interaction, targetID) => {
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
};
