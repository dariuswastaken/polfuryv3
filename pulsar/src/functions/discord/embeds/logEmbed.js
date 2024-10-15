import Discord from 'npm:discord.js';

export const createLogEmbed = async (options) => {
  const embed = new Discord.EmbedBuilder().setColor('#8B4513');

  const { title, fields, description, footer, channel, components, guild } =
    options;

  if (title) embed.setTitle(title);
  if (fields) embed.addFields(fields);
  if (description) embed.setDescription(description);
  if (footer) embed.setFooter(footer);

  if (channel) {
    const sendOptions = {
      embeds: [embed],
      components
    };

    if (!guild) {
      return console.error(
        new Error('[PULSAR] No guild specified for LOG_EMBED')
      );
    }

    const targetChannel = await guild.channels.cache.get(channel);
    await targetChannel.send(sendOptions);
  }
};
