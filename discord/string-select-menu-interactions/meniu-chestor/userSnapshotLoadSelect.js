export default {
  name: 'user-snapshot-select-load',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils, botconfig) {
    await interaction.deferReply({ ephemeral: true });

    const snapshotID = interaction.values[0];
    const targetID = interaction.customId.split('/')[1];

    await utils.discord.buttonMenus.sendSnapshotOverview(
      {
        pulsar: pulsar,
        interaction: interaction,
        mongo: mongo,
        targetID: targetID,
        snapshotID: snapshotID,
        type: 'load'
      },
      botconfig
    );
  }
};
