export default {
  name: 'chestor-edit-menu',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils, botconfig) {
    await interaction.deferReply({ ephemeral: true });

    const targetID = interaction.customId.split('/')[1];

    await utils.discord.buttonMenus.sendUserEditMenu(
      {
        pulsar: pulsar,
        interaction: interaction,
        targetID: targetID
      },
      botconfig
    );
  }
};
