export default {
  name: 'open-sanction-thread',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await utils.discord.modals.displaySanctionCallsignInputModal(
      pulsar,
      interaction
    );
  }
};
