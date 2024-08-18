module.exports = {
  name: 'moto-clock-in',
  enabled: false,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const profile = await mongo.getProfile(interaction.user.id);
    if (!profile) {
      await utils.discord.errors.noProfileError(pulsar, interaction);
      return;
    }

    let hasSession = await mongo.hasSession(
      'EvidentaMoto',
      interaction.user.id
    );
    if (hasSession) {
      await utils.discord.errors.alreadyInMotoSessionError(pulsar, interaction);
      return;
    }

    if (profile.certificate.moto === false) {
      await utils.discord.errors.noMotoCertificateError(pulsar, interaction);
      return;
    }

    await utils.discord.buttonMenus.mphClockInSelect({
      pulsar: pulsar,
      interaction: interaction,
      type: 'moto'
    });
  }
};
