export default {
  name: 'pilot-clock-in',
  enabled: false,
  async execute(pulsar, interaction, mongo, utils, botconfig) {
    await interaction.deferReply({ ephemeral: true });

    const profile = await mongo.getProfile(interaction.user.id);
    if (!profile) {
      await utils.discord.errors.noProfileError(pulsar, interaction);
      return;
    }

    let hasSession = await mongo.hasSession(
      'EvidentaPilot',
      interaction.user.id
    );
    if (hasSession) {
      await utils.discord.errors.alreadyInPilotSessionError(
        pulsar,
        interaction
      );
      return;
    }

    if (profile.certificate.pilot === false) {
      await utils.discord.errors.noPilotCertificateError(pulsar, interaction);
      return;
    }

    await utils.discord.buttonMenus.mphClockInSelect(
      {
        pulsar: pulsar,
        interaction: interaction,
        type: 'pilot'
      },
      botconfig
    );
  }
};
