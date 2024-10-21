export default {
    name: 'modal-pilot-instr-adaugare',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const validate = await utils.discord.validate.callsignInputSubdep({
            pulsar: pulsar,
            interaction: interaction,
            utils: utils,
            mongo: mongo,
            subdep: 'pilot',
            type: 'Instr. Pilot',
            modalType: 'add'
        });

        if (validate === 'invalid') return;

        await utils.discord.quickFunctions.addFunc(
            interaction,
            validate.profile.IDDiscord,
            mongo,
            'Instr. Pilot'
        );

        await utils.discord.embeds.sendSuccessEmbed(
            `I-a fost oferita cu succes functia de **INSTRUCTOR PILOT** membrului **${validate.profile.nume}**.`,
            {
                pulsar: pulsar,
                interaction: interaction
            }
        );
    }
};
