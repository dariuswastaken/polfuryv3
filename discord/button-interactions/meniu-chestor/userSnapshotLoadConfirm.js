export default {
    name: 'user-snapshot-confirm-load',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];
        const snapshotID = interaction.customId.split('/')[2];

        await mongo.loadMemberSnapshot(snapshotID, targetID);

        await utils.discord.embeds.sendSuccessEmbed('Snapshot incarcat cu succes.', {
            pulsar: pulsar,
            interaction: interaction
        });
    }
};
