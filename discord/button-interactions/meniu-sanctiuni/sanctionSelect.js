export default {
    name: 'sanction-select',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];
        const sanctionID = interaction.customId.split('/')[2];
        const option = interaction.customId.split('/')[3];

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

        if (sanction.pending === false) {
            await utils.discord.errors.cannotAddSanctionError(pulsar, interaction);
            return;
        }

        await utils.discord.selectMenus.sendSanctionDurationChoiceMenu({
            pulsar: pulsar,
            interaction: interaction,
            sanctionID: sanctionID,
            sanction: option
        });
    }
};
