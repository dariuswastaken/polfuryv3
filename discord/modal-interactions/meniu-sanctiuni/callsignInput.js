export default {
  name: 'modal-sanction-callsign-input',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const validate = await utils.discord.validate.callsignInput({
      pulsar: pulsar,
      interaction: interaction,
      utils: utils,
      mongo: mongo
    });

    if (validate === 'invalid') return;

    const sanctionID = await pulsar.utilsManager.uniques.createUniqueID();

    await utils.discord.buttonMenus.sendSanctionMenu({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo,
      targetID: validate.profile.IDDiscord,
      sanctionID: sanctionID,
    });
  }
};
