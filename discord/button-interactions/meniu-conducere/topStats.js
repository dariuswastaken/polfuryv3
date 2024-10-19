export default {
  name: 'top-stats',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils, botconfig) {
    await interaction.deferReply({ ephemeral: true });

    const type = interaction.customId.split('/')[1];
    
    const top = await mongo.getTop(type);
    console.log(top);
  }
};