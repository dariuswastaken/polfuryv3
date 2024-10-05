module.exports = {
  name: 'modal-tester-instr-adaugare',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const validate = await utils.discord.validate.callsignInputSubdep({
      pulsar: pulsar,
      interaction: interaction,
      utils: utils,
      mongo: mongo,
      subdep: 'tester',
      type: 'Tester',
      modalType: 'add'
    });

    if (validate === 'invalid') return;

    await utils.discord.quickFunctions.addFunc(
      interaction,
      validate.profile.IDDiscord,
      mongo,
      'Tester'
    );

    await utils.discord.embeds.sendSuccessEmbed(
      `I-a fost oferita cu succes functia de **TESTER** membrului **${validate.profile.nume}**.`,
      {
        pulsar: pulsar,
        interaction: interaction
      }
    );
  }
};
