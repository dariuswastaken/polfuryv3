module.exports = {
  name: 'modal-pilot-instr-activity',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const validate = await utils.discord.validate.callsignInputInstrActivity({
      pulsar: pulsar,
      interaction: interaction,
      utils: utils,
      mongo: mongo,
      subdep: 'pilot'
    });

    if (validate === 'invalid') return;

    await utils.discord.embeds.sendInstrActivityEmbed({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo,
      targetID: validate.profile.IDDiscord,
      subdep: 'Pilot',
      type: 'pilot'
    });
  }
};
