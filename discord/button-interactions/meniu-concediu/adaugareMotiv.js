export default {
    name: 'adaugare-motiv-concediu',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        const week = await utils.dayConversion.getCurrentWeek();
        const leave = await mongo.getLeave(interaction.user.id, `${week[0]} - ${week[6]}`);
        if (!leave) {
            await utils.discord.errors.noLeaveError(pulsar, interaction);
            return;
        }

        await utils.discord.modals.displayMotivConcediuModal(
            pulsar,
            interaction,
            interaction.user.id
        );
    }
};
