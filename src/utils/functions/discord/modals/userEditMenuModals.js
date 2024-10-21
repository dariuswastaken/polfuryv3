export const displayUserEditModal = async ({
    pulsar,
    interaction,
    targetID,
    type,
    title,
    placeholder
}) => {
    const modal = await pulsar.discordManager.modals.createModal({
        id: `modal-edit-user-${type.toLowerCase()}/${targetID}`,
        title: `Meniu Editare User | ${title}`,
        inputs: [
            {
                id: `m-edit-user-${type.toLowerCase()}-input`,
                label: `${title}`,
                placeholder: `${placeholder}`,
                style: 'Short',
                required: true
            }
        ]
    });

    await interaction.showModal(modal);
};
