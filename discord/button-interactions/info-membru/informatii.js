export default {
    name: 'informatii-membru',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetProfile = await mongo.getProfile(interaction.user.id);
        if (!targetProfile) {
            await utils.discord.errors.noProfileError(pulsar, interaction);
            return;
        }

        await utils.discord.embeds.sendUserInfoEmbed({
            pulsar: pulsar,
            interaction: interaction,
            mongo: mongo,
            targetID: interaction.user.id
        });
    }
};
