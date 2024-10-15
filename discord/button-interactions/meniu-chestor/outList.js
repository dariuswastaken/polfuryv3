export default {
  name: 'out-list',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const week = interaction.customId.split('/')[1];

    const hasUpList = await mongo.getEntryList('out', week);

    if (!hasUpList) {
      await utils.discord.errors.noOutListError(pulsar, interaction);
      return;
    }

    await utils.discord.embeds.sendOutList({
      pulsar: pulsar,
      interaction: interaction,
      utils: utils,
      mongo: mongo,
      week: week
    });
  }
};
