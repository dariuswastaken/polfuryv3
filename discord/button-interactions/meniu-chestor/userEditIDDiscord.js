export default {
  name: 'edit-user-id',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    const targetID = interaction.customId.split('/')[1];

    await utils.discord.modals.displayUserEditModal({
      pulsar: pulsar,
      interaction: interaction,
      targetID: targetID,
      type: 'id',
      title: 'Editare ID Discord',
      placeholder: 'Introdu noul ID de Discord'
    });
  }
};
