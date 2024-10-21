export default {
    name: 'radio-menu-remove-instr',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await utils.discord.modals.displayInstrMenuCallsignInputModal(
            pulsar,
            interaction,
            'radio',
            'Scoatere'
        );
    }
};
