module.exports = {
    name: 'user-snapshot-confirm-delete',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
      await interaction.deferReply({ ephemeral: true });
  
      const snapshotID = interaction.customId.split('/')[2];
  
      await mongo.deleteMemberSnapshot(snapshotID);
  
      await utils.discord.embeds.sendSuccessEmbed(
        'Snapshot sters cu succes.',
        {
          pulsar: pulsar,
          interaction: interaction
        }
      );
    }
  };
  