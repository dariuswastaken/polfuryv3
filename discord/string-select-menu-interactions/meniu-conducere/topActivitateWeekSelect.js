export default {
  name: 'top-activity-week-select',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils, botconfig) {
    await interaction.deferReply({ ephemeral: true });

    const type = interaction.customId.split('/')[2];
    const week = interaction.values[0];

    const top = await mongo.getTop(week, type);
    
    console.log(top);
  }
};
