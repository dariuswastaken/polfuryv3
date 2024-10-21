export default {
    name: 'chestor-creare-lista',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        await utils.discord.selectMenus.sendChestorWeekChoiceMenu({
            pulsar: pulsar,
            interaction: interaction,
            mongo: mongo,
            customID: 'creare-lista-week-select',
            title: 'Creare Lista Activitate'
        });
    }
};
