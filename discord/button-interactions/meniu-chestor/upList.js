export default {
    name: 'up-list',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const week = interaction.customId.split('/')[1];

        const hasUpList = await mongo.getEntryList('up', week);

        if (!hasUpList) {
            await utils.discord.errors.noUpListError(pulsar, interaction);
            return;
        }

        await utils.discord.embeds.sendUpList({
            pulsar: pulsar,
            interaction: interaction,
            utils: utils,
            mongo: mongo,
            week: week
        });
    }
};
