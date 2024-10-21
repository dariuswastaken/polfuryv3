export default {
    name: 'edit-user-snapshot-load',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];

        const snapshots = await mongo.getUserSnapshots(targetID);

        if (snapshots.length === 0) {
            await utils.discord.errors.noSnapshotsError(pulsar, interaction);
            return;
        }

        await utils.discord.selectMenus.sendUserSnapshotChoiceMenu({
            pulsar: pulsar,
            interaction: interaction,
            mongo: mongo,
            targetID: targetID,
            type: 'load'
        });
    }
};
