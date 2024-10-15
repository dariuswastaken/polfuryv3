export default {
  name: 'menu-demitere',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const option = interaction.customId.split('/')[1];
    const targetID = interaction.customId.split('/')[2];
    const componentUID = interaction.customId.split('/')[3];

    const targetProfile = await mongo.getProfile(targetID);
    const componentData = await mongo.getComponent(componentUID);
    const targetMember = await interaction.guild.members.fetch(targetID);

    if (componentData.disabled === true) {
      await utils.discord.errors.componentDisabledError(pulsar, interaction);
      return;
    }

    if (option === 'confirm') {
      await mongo.disableComponent(componentUID);
      await mongo.deleteProfile(targetID);
      await mongo.updateCallsign(
        targetProfile.grad,
        targetProfile.callsign,
        false
      );
      await targetMember.kick(`Demitere - ${interaction.user.username}`);

      await utils.discord.embeds.sendSuccessEmbed(
        `\`${targetProfile.nume}\` a fost demis cu succes.`,
        {
          pulsar: pulsar,
          interaction: interaction
        }
      );

      await utils.discord.logging.createSimpleLog(mongo, {
        type: 'demitere',
        targetID: targetID,
        authorID: interaction.user.id,
        nume: targetProfile.nume,
        grad: targetProfile.grad,
        callsign: targetProfile.callsign,
        date: new Date()
      });
    } else if (option === 'cancel') {
      await mongo.disableComponent(componentUID);
      await utils.discord.embeds.sendSuccessEmbed(
        'Demiterea a fost anulata cu succes.',
        {
          pulsar: pulsar,
          interaction: interaction
        }
      );
    }
  }
};
