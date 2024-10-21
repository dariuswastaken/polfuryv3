export default {
    name: 'meniu-concediu',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils, botconfig) {
        await interaction.deferReply({ ephemeral: true });

        const profile = await mongo.getProfile(interaction.user.id);
        if (!profile) {
            await utils.discord.errors.noProfileError(pulsar, interaction);
            return;
        }

        await utils.discord.buttonMenus.sendMenuConcediu(
            {
                pulsar: pulsar,
                interaction: interaction,
                mongo: mongo
            },
            botconfig
        );
    }
};
