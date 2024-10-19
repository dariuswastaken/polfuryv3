export default {
  name: 'top-activity-week-select',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils, botconfig) {
    await interaction.deferReply({ ephemeral: true });

    const type = interaction.customId.split('/')[2];
    const week = interaction.values[0];

    const top = await mongo.getTop(week, type);
    let formattedTop = [];
    for (let i = 0; i < top.length; i++) {
      const user = await mongo.getProfile(top[i].IDDiscord);
      formattedTop.push(
        `${user.nume} - ${top[i].data[type]} ${type === `pontaj` ? ' minute' : ''}`
      );
    }

    await utils.discord.embeds.sendTopActivityEmbed({
      pulsar: pulsar,
      interaction: interaction,
      type: type,
      week: week,
      list: formattedTop
    });
  }
};
