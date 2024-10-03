module.exports = {
  name: 'edit-user-delete',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const targetID = interaction.customId.split('/')[1];

    await utils.discord.buttonMenus.sendMenuDeleteUser({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo,
      targetID: targetID,
    })
  }
};
