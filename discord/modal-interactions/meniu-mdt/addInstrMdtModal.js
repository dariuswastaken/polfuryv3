export default {
  name: 'modal-mdt-instr-adaugare',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const validate = await utils.discord.validate.callsignInputSubdep({
      pulsar: pulsar,
      interaction: interaction,
      utils: utils,
      mongo: mongo,
      subdep: 'mdt',
      type: 'Instr. MDT',
      modalType: 'add'
    });

    if (validate === 'invalid') return;

    await utils.discord.quickFunctions.addFunc(
      interaction,
      validate.profile.IDDiscord,
      mongo,
      'Instr. MDT'
    );

    await utils.discord.embeds.sendSuccessEmbed(
      `I-a fost oferita cu succes functia de **INSTRUCTOR MDT** membrului **${validate.profile.nume}**.`,
      {
        pulsar: pulsar,
        interaction: interaction
      }
    );
  }
};
