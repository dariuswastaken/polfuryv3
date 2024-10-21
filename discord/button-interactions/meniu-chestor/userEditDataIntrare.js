export default {
    name: 'edit-user-data-intrare',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        const targetID = interaction.customId.split('/')[1];

        await utils.discord.modals.displayUserEditModal({
            pulsar: pulsar,
            interaction: interaction,
            targetID: targetID,
            type: 'data-intrare',
            title: 'Editare Data Intrare',
            placeholder: 'Introdu noua data'
        });
    }
};
