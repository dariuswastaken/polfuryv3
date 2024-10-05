module.exports = {
  name: 'close-sanction-channel',
  enabled: false,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const userID = interaction.customId.split('/')[1];
    const sanctionID = interaction.customId.split('/')[2];

    const transcript = await utils.discord.quickFunctions.createChannelTranscript({
      interaction: interaction,
      channelID: interaction.channel.id,
      type: 'Sanctiune'
    });

    const user = await interaction.guild.members.fetch(userID);

    try {
      await user.send({
        content: `Sanctiunea ta a fost marcata ca si **REZOLVATA**.\nMai jos ai transcriptul sanctiunii tale.\n\n**ID Sanctiune:** ${sanctionID}`,
        files: [
          {
            attachment: transcript,
            name: `transcript-sanctiune-${userID}-${sanctionID}.html`
          }
        ]
      });
    } catch (e) {
      console.log(
        `[DISCORD ERROR] Could not send transcript to ${userID}\n${e.stack}`
      );
    }

    await interaction.channel.delete();
  }
};
