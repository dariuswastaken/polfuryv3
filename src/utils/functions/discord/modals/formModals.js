export const displayFormularIntrare = async (pulsar, interaction, targetID) => {
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
                placeholder: 'Introdu token-ul oferit de catre noi (NU TOKEN-UL DE DISCORD)',
                style: 'Paragraph',
                required: true
            }
        ]
    });

    await interaction.showModal(modal);
};

export const displayFormularDemisie = async (pulsar, interaction, targetID) => {
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
};

export const displayFormularTrecereTest = async (pulsar, interaction, targetID) => {
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
};
