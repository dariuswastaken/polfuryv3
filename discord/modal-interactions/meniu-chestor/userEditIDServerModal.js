export default {
    name: 'modal-edit-user-idserver',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];

        const id = await interaction.fields.getTextInputValue('m-edit-user-idserver-input');

        await mongo.updateProfileIDServer(targetID, parseInt(id));

        await utils.discord.embeds.sendSuccessEmbed('ID-ul a fost schimbat cu succes.', {
            pulsar: pulsar,
            interaction: interaction
        });
    }
};
