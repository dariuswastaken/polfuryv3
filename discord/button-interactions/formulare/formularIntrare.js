export default {
    name: 'formular-intrare',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await utils.discord.modals.displayFormularIntrare(pulsar, interaction, interaction.user.id);
    }
};
