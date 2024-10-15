export default {
  name: 'sanction-confirm',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    const targetID = interaction.customId.split('/')[1];
    const sanctionID = interaction.customId.split('/')[2];

    const sanction = await mongo.getSanction(sanctionID);

    if (sanction.sanctions === null) {
      await utils.discord.errors.noSanctionsError(pulsar, interaction);
      return;
    }

    if (sanction.pending === false) {
      await utils.discord.errors.cannotCreateThreadAgainError(
        pulsar,
        interaction
      );
      return;
    }

    await utils.discord.modals.displaySanctionMotivInputModal(
      pulsar,
      interaction,
      sanctionID
    );
  }
};
