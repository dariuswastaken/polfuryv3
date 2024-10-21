export default {
    name: 'edit-user-snapshot',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];

        const snapshotID = await pulsar.utilsManager.uniques.createUniqueID();
        await mongo.createMemberSnapshot(targetID, snapshotID);

        await utils.discord.embeds.sendSuccessEmbed(
            'Snapshot-ul a fost creat cu succes.\n\n**Snapshot ID:** ' + snapshotID,
            {
                pulsar: pulsar,
                interaction: interaction
            }
        );
    }
};
