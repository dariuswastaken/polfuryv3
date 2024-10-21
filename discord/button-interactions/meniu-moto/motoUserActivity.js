export default {
    name: 'moto-menu-user-activity',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await utils.discord.modals.displayInstrActivityCallsignInputModal(
            pulsar,
            interaction,
            'moto'
        );
    }
};
