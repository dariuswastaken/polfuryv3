export default {
    name: 'activitate',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];

        const userActivity = await mongo.getAllActivity(targetID);
        const profile = await mongo.getProfile(targetID);

        if (!profile) {
            await utils.discord.errors.noProfileError(pulsar, interaction);
            return;
        }

        if (!userActivity || userActivity.length === 0) {
            await utils.discord.errors.noActivityError(pulsar, interaction);
            return;
        }

        await utils.discord.selectMenus.sendActivityWeekChoiceMenu({
            pulsar: pulsar,
            interaction: interaction,
            mongo: mongo,
            targetID: targetID
        });
    }
};
