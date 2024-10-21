export default {
    name: 'radio-menu',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils, botconfig) {
        await interaction.deferReply({ ephemeral: true });

        await utils.discord.buttonMenus.sendSubdepSubMenu(
            {
                pulsar: pulsar,
                interaction: interaction,
                mongo: mongo,
                subdep: 'Radio',
                type: 'radio'
            },
            botconfig
        );
    }
};
