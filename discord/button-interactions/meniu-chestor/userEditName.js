export default {
  name: 'edit-user-name',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    const targetID = interaction.customId.split('/')[1];

    await utils.discord.modals.displayUserEditModal({
      pulsar: pulsar,
      interaction: interaction,
      targetID: targetID,
      type: 'name',
      title: 'Editare Nume',
      placeholder: 'Introdu noul nume'
    });
  }
};
