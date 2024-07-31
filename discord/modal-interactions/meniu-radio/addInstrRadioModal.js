module.exports = {
  name: 'modal-radio-instr-adaugare',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const validate = await utils.discord.validate.callsignInputSubdep({
      pulsar: pulsar,
      interaction: interaction,
      utils: utils,
      mongo: mongo,
      subdep: 'radio',
      type: 'Instr. Radio',
      modalType: 'add'
    });

    if (validate === 'invalid') return;

    await utils.quickFunctions.addFunc(
      interaction,
      validate.profile.IDDiscord,
      mongo,
      'Instr. Radio'
    );

    await utils.discord.embeds.sendSuccessEmbed(
      `I-a fost oferita cu succes functia de **INSTRUCTOR RADIO** membrului **${validate.profile.nume}**.`,
      {
        pulsar: pulsar,
        interaction: interaction
      }
    );
  }
};
