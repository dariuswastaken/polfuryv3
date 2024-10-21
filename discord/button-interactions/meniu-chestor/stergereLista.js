export default {
    name: 'chestor-stergere-lista',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        await utils.discord.selectMenus.sendChestorWeekChoiceMenu({
            pulsar: pulsar,
            interaction: interaction,
            mongo: mongo,
            customID: 'list-delete-select',
            title: 'Meniu Selectare Saptamana - Stergere Liste'
        });
    }
};
