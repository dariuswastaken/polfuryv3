export default {
    name: 'menu-delete-user',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const option = interaction.customId.split('/')[1];
        const targetID = interaction.customId.split('/')[2];
        const componentUID = interaction.customId.split('/')[3];

        const componentData = await mongo.getComponent(componentUID);

        if (componentData.disabled === true) {
            await utils.discord.errors.componentDisabledError(pulsar, interaction);
            return;
        }

        if (option === 'confirm') {
            await mongo.deleteProfile(targetID);
            await mongo.deleteComponent(componentUID);

            await utils.discord.embeds.sendSuccessEmbed('Utilizatorul a fost sters cu succes.', {
                pulsar: pulsar,
                interaction: interaction
            });
        } else if (option === 'cancel') {
            await mongo.disableComponent(componentUID);

            await utils.discord.embeds.sendSuccessEmbed(
                'Operatia de stergere a fost anulata cu succes.',
                {
                    pulsar: pulsar,
                    interaction: interaction
                }
            );
        }
    }
};
