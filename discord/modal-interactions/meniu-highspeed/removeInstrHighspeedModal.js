export default {
    name: 'modal-highspeed-instr-scoatere',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const validate = await utils.discord.validate.callsignInputSubdep({
            pulsar: pulsar,
            interaction: interaction,
            utils: utils,
            mongo: mongo,
            subdep: 'highspeed',
            type: 'Instr. HS',
            modalType: 'remove'
        });

        if (validate === 'invalid') return;

        await utils.discord.quickFunctions.removeFunc(
            interaction,
            validate.profile.IDDiscord,
            mongo,
            'Instr. HS'
        );

        await utils.discord.embeds.sendSuccessEmbed(
            `I-a fost scoasa cu succes functia de **INSTRUCTOR HS** membrului **${validate.profile.nume}**.`,
            {
                pulsar: pulsar,
                interaction: interaction
            }
        );
    }
};
