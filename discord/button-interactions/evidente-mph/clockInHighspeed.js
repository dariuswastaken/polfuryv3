export default {
    name: 'highspeed-clock-in',
    enabled: false,
    async execute(pulsar, interaction, mongo, utils, botconfig) {
        await interaction.deferReply({ ephemeral: true });

        const profile = await mongo.getProfile(interaction.user.id);
        if (!profile) {
            await utils.discord.errors.noProfileError(pulsar, interaction);
            return;
        }

        let hasSession = await mongo.hasSession('EvidentaHighspeed', interaction.user.id);
        if (hasSession) {
            await utils.discord.errors.alreadyInHighspeedSessionError(pulsar, interaction);
            return;
        }

        if (profile.certificate.highspeed === false) {
            await utils.discord.errors.noHighspeedCertificateError(pulsar, interaction);
            return;
        }

        await utils.discord.buttonMenus.mphClockInSelect(
            {
                pulsar: pulsar,
                interaction: interaction,
                type: 'highspeed'
            },
            botconfig
        );
    }
};
