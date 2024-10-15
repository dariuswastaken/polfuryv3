import Discord from 'npm:discord.js';

export const createForumThreadEmbed = async (options) => {
  const embed = new Discord.EmbedBuilder().setColor('#D37506');

  const { title, description, fields, footer, components, guild } = options;

  if (title) embed.setTitle(title);
  if (description) embed.setDescription(description);
  if (fields) embed.addFields(fields);
  if (footer) embed.setFooter(footer);

  if (components) {
    return {
      embeds: embed,
      components
    };
  }

  if (!guild) {
    return console.error(
      new Error('[PULSAR] No guild specified for FORUM_THREAD_EMBED')
    );
  }
};
