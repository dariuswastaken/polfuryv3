export default {
  name: 'edit-user-idserver',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    const targetID = interaction.customId.split('/')[1];

    await utils.discord.modals.displayUserEditModal({
      pulsar: pulsar,
      interaction: interaction,
      targetID: targetID,
      type: 'idserver',
      title: 'Editare ID Server',
      placeholder: 'Introdu noul ID Server'
    });
  }
};
