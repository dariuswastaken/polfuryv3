export default {
  name: 'modal-sanction-reason-input',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils, botconfig) {
    await interaction.deferReply({ ephemeral: true });

    const sanctionID = interaction.customId.split('/')[1];

    const validate = await utils.discord.validate.reasonInput({
      pulsar: pulsar,
      interaction: interaction,
      utils: utils
    });

    if (validate === 'invalid') return;

    const sanction = await mongo.getSanction(sanctionID);

    if (sanction.pending === false) {
      await utils.discord.errors.cannotCreateThreadAgainError(
        pulsar,
        interaction
      );
      return;
    }

    await mongo.updateSanctionReason(sanctionID, validate.reason);

    await utils.discord.quickFunctions.createSanctionThread(
      {
        pulsar: pulsar,
        utils: utils,
        interaction: interaction,
        mongo: mongo,
        sanction: sanction,
        reason: validate.reason
      },
      botconfig
    );
  }
};
