export default {
    name: 'modal-moto-instr-adaugare',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const validate = await utils.discord.validate.callsignInputSubdep({
            pulsar: pulsar,
            interaction: interaction,
            utils: utils,
            mongo: mongo,
            subdep: 'moto',
            type: 'Instr. Moto',
            modalType: 'add'
        });

        if (validate === 'invalid') return;

        await utils.discord.quickFunctions.addFunc(
            interaction,
            validate.profile.IDDiscord,
            mongo,
            'Instr. Moto'
        );

        await utils.discord.embeds.sendSuccessEmbed(
            `I-a fost oferita cu succes functia de **INSTRUCTOR MOTO** membrului **${validate.profile.nume}**.`,
            {
                pulsar: pulsar,
                interaction: interaction
            }
        );
    }
};
