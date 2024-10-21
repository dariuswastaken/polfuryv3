export default {
    name: 'chestor-liste',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        await utils.discord.selectMenus.sendChestorWeekChoiceMenu({
            pulsar: pulsar,
            interaction: interaction,
            mongo: mongo,
            customID: 'list-select',
            title: 'Meniu Selecatre Saptamana - Liste'
        });
    }
};
