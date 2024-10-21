export default {
    name: 'stergere-certificat',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];

        await utils.discord.selectMenus.sendCertificateChoiceMenu({
            pulsar: pulsar,
            interaction: interaction,
            menuTitle: 'Stergere Certificat',
            type: 'stergere',
            targetID: targetID
        });
    }
};
