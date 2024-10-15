export default {
  name: 'list-delete-select',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const week = interaction.values[0];

    const hasList = await mongo.getEntryList('up', week);
    if (!hasList) {
      await utils.discord.errors.noListsError(pulsar, interaction);
      return;
    }

    await mongo.deleteEntryList('up', week);
    await mongo.deleteEntryList('out', week);

    await utils.discord.embeds.sendSuccessEmbed(
      'Listele au fost sterse cu succes.',
      {
        pulsar: pulsar,
        interaction: interaction
      }
    );
  }
};
