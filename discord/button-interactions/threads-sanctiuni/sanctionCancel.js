export default {
    name: 'sanction-thread-cancel',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const user = await interaction.guild.members.fetch(interaction.user.id);
        if (!user.roles.cache.some((r) => r.id === '1119645178148442152')) {
            await utils.discord.errors.sanctionPermError(pulsar, interaction);
            return;
        }

        const sanctionID = interaction.customId.split('/')[1];

        const sanction = await mongo.getSanction(sanctionID);
        if (sanction.active === false) {
            await utils.discord.errors.threadClosedError(pulsar, interaction);
            return;
        }

        await mongo.closeSanction(sanctionID);

        await utils.discord.embeds.sendSuccessEmbed(
            'Sanctiunea a fost anulata, thread-ul a fost marcat ca si **INCHIS**.',
            {
                pulsar: pulsar,
                interaction: interaction
            }
        );
    }
};
