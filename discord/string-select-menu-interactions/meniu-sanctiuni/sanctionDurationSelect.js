export default {
    name: 'sanction-duration-select',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const sanctionID = interaction.customId.split('/')[1];
        const option = interaction.customId.split('/')[2];
        const duration = interaction.values[0];

        let sanction = await mongo.getSanction(sanctionID);

        if (sanction.sanctions === null) sanction.sanctions = [];

        const formattedSanctionList = [];
        for (let sanc of sanction.sanctions) {
            formattedSanctionList.push(sanc.split(' - ')[0]);
        }

        if (sanction.sanctions !== null && formattedSanctionList.includes(option)) {
            await utils.discord.errors.hasSanctionAlreadyError(pulsar, interaction);
            return;
        }

        if (duration === 'permanent') {
            await mongo.updateSanctionList(sanctionID, `${option} - Permanent`, []);
        } else {
            let expiryDate = new Date().setDate(new Date().getDate() + parseInt(duration));
            await mongo.updateSanctionList(sanctionID, `${option} - ${duration} zile`, [
                { sanction: option, expiryDate: expiryDate }
            ]);
        }

        await utils.discord.embeds.sendSuccessEmbed('Sanctiunea a fost adaugata.', {
            pulsar: pulsar,
            interaction: interaction
        });
    }
};
