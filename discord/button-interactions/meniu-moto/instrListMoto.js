export default {
    name: 'moto-menu-instructori',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils, botconfig) {
        await interaction.deferReply({ ephemeral: true });

        await utils.discord.embeds.sendSubdepMemberList(
            {
                pulsar: pulsar,
                interaction: interaction,
                mongo: mongo,
                type: 'Instr. Moto',
                subdep: 'Moto',
                title: 'LISTA INSTRUCTORI MOTO',
                mongoQuery: 'moto',
                depType: 'Instructori Moto'
            },
            botconfig
        );
    }
};
