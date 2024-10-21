export default {
    name: 'tester-menu-instructori',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils, botconfig) {
        await interaction.deferReply({ ephemeral: true });

        await utils.discord.embeds.sendSubdepMemberList(
            {
                pulsar: pulsar,
                interaction: interaction,
                mongo: mongo,
                type: 'Tester',
                subdep: 'Tester',
                title: 'LISTA TESTERI',
                mongoQuery: 'tester',
                depType: 'Testeri'
            },
            botconfig
        );
    }
};
