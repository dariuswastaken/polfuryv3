export default {
    name: 'highspeed-menu-user-activity',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await utils.discord.modals.displayInstrActivityCallsignInputModal(
            pulsar,
            interaction,
            'highspeed'
        );
    }
};
