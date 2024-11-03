import Discord from 'npm:discord.js';
import { CreateForumThreadEmbedOptions } from '../../../../interfaces/discord/embeds/forumThreadEmbed.interfaces.ts';

export const createForumThreadEmbed = async (
    options: CreateForumThreadEmbedOptions
): Promise<{ embeds: Discord.EmbedBuilder[]; components?: any[] }> => {
    const embed = new Discord.EmbedBuilder().setColor('#D37506');

    const { title, description, fields, footer, components, guild } = options;

    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (fields) embed.addFields(fields);
    if (footer) embed.setFooter(footer);

    const response = { embeds: embed, ...(components && { components }) };

    if (components) {
        return response;
    }

    if (!guild) {
        console.error(new Error('[PULSAR] No guild specified for FORUM_THREAD_EMBED'));
        return response;
    }

    return response;
};
