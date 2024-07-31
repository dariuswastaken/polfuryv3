module.exports = {
  name: 'creare-lista-week-select',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const week = interaction.values[0];

    await utils.quickFunctions.createActivityList({
      pulsar: pulsar,
      utils: utils,
      interaction: interaction,
      mongo: mongo,
      week: week
    })
  }
};
