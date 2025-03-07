import Discord from 'npm:discord.js';
import { CreateErrorEmbedOptions } from '../../../../interfaces/discord/embeds/errorEmbed.interfaces.ts';

export const createErrorEmbed = async (
    type: string,
    description: string,
    options: CreateErrorEmbedOptions
): Promise<void> => {
    const embed = new Discord.EmbedBuilder()
        .setTitle(type)
        .setDescription(description)
        .setColor('#FF0000');

    const {
        fields,
        footer,
        interaction,
        message,
        channel,
        components,
        edit,
        ephemeral,
        deferReply,
        guild
    } = options;

    if (fields) embed.addFields(fields);
    if (footer) embed.setFooter(footer);

    const replyOptions = { embeds: [embed], ephemeral, components };

    if (interaction) {
        if (deferReply) {
            await interaction.editReply(replyOptions);
        } else {
            await interaction.reply(replyOptions);
        }
    } else if (message) {
        if (edit) {
            await message.edit(replyOptions);
        } else {
            await message.channel.send(replyOptions);
        }
    } else if (channel) {
        if (!guild) {
            return console.error(new Error('[PULSAR] No guild specified for ERROR_EMBED'));
        }

        const targetChannel = await guild.channels.cache.get(channel);
        await targetChannel.send(replyOptions);
    } else {
        return console.error(new Error('[PULSAR] Invalid event type'));
    }
};
