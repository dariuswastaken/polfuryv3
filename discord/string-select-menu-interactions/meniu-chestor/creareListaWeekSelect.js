export default {
  name: 'creare-lista-week-select',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const week = interaction.values[0];

    const hasList = await mongo.getEntryList('up', week);
    if(hasList) {
      await utils.discord.errors.listAlreadyExistsError(pulsar, interaction);
      return;
    }

    const upList = await utils.discord.quickFunctions.createUpList({
      interaction: interaction,
      pulsar: pulsar,
      utils: utils,
      mongo: mongo,
      week: week
    })

    const outList = await utils.discord.quickFunctions.createOutList({
      interaction: interaction,
      pulsar: pulsar,
      utils: utils,
      mongo: mongo,
      week: week
    })

    await mongo.createEntryList('up', week, upList.userIDList);
    await mongo.createEntryList('out', week, outList.userIDList);
  }
};
