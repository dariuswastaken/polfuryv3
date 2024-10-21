export default {
    name: 'modal-edit-user-data-intrare',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];

        const dataIntrare = await interaction.fields.getTextInputValue(
            'm-edit-user-data-intrare-input'
        );

        await mongo.updateProfileIDServer(targetID, dataIntrare);

        await utils.discord.embeds.sendSuccessEmbed('Data de intrare a fost schimbata cu succes.', {
            pulsar: pulsar,
            interaction: interaction
        });
    }
};
