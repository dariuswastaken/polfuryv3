export default {
    name: 'activitate-select',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const week = interaction.values[0];
        const targetID = interaction.customId.split('/')[1];

        await utils.discord.embeds.sendUserActivityEmbed({
            pulsar: pulsar,
            interaction: interaction,
            mongo: mongo,
            targetID: targetID,
            utils: utils,
            week: week
        });
    }
};
