export default {
    name: 'modal-edit-user-id',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];

        const id = await interaction.fields.getTextInputValue('m-edit-user-id-input');

        await mongo.updateProfileIDServer(targetID, id);

        await utils.discord.embeds.sendSuccessEmbed('ID-ul de discord a fost schimbat cu succes.', {
            pulsar: pulsar,
            interaction: interaction
        });
    }
};
