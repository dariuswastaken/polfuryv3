export default {
    name: 'mdt-menu-add-instr',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await utils.discord.modals.displayInstrMenuCallsignInputModal(
            pulsar,
            interaction,
            'mdt',
            'Adaugare'
        );
    }
};
