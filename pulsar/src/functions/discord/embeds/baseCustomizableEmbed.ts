import Discord from 'npm:discord.js';
import { CreateEmbedOptions } from '../../../../interfaces/discord/embeds/createEmbed.interfaces.ts';

export const createEmbed = async (options: CreateEmbedOptions): Promise<void> => {
    const embed = new Discord.EmbedBuilder().setColor(options.color || '#D37506');

    const {
        title,
        description,
        fields,
        footer,
        interaction,
        message,
        channel,
        components,
        ephemeral,
        deferReply,
        guild,
        edit
    } = options;

    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (fields) embed.addFields(fields);
    if (footer) embed.setFooter(footer);

    const replyOptions = {
        embeds: [embed],
        ephemeral,
        components
    };

    if (interaction) {
        if (deferReply) {
            await interaction.editReply(replyOptions);
        } else {
            await interaction.reply(replyOptions);
        }
    } else if (message) {
        if (edit === true) {
            await message.edit(replyOptions);
        } else {
            await message.channel.send(replyOptions);
        }
    } else if (channel) {
        if (!guild) {
            return console.error(new Error('[PULSAR] No guild specified for EMBED'));
        }

        const targetChannel = await guild.channels.cache.get(channel);
        await targetChannel.send(replyOptions);
    } else {
        return console.error(new Error('[PULSAR] Invalid event type'));
    }
};
