export default {
  name: 'modal-edit-user-name',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const targetID = interaction.customId.split('/')[1];

    const name = await interaction.fields.getTextInputValue(
      'm-edit-user-name-input'
    );

    await mongo.updateProfileName(targetID, name);

    await utils.discord.embeds.sendSuccessEmbed(
      'Numele a fost schimbat cu succes.',
      {
        pulsar: pulsar,
        interaction: interaction
      }
    );
  }
};
