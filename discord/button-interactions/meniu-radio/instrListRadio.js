export default {
    name: 'radio-menu-instructori',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils, botconfig) {
        await interaction.deferReply({ ephemeral: true });

        await utils.discord.embeds.sendSubdepMemberList(
            {
                pulsar: pulsar,
                interaction: interaction,
                mongo: mongo,
                type: 'Instr. Radio',
                subdep: 'Radio',
                title: 'LISTA INSTRUCTORI RADIO',
                mongoQuery: 'radio',
                depType: 'Instructori Radio'
            },
            botconfig
        );
    }
};
