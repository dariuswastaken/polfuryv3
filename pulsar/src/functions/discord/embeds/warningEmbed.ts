import Discord from 'npm:discord.js';
import { CreateWarningEmbedOptions } from '../../../../interfaces/discord/embeds/warningEmbed.interfaces.ts';

export const createWarningEmbed = async (
    type: string,
    description: string,
    options: CreateWarningEmbedOptions
): Promise<void> => {
    const embed = new Discord.EmbedBuilder()
        .setTitle(type)
        .setDescription(description)
        .setColor('#FFD700');

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
            return console.error(new Error('[PULSAR] No guild specified for WARNING_EMBED'));
        }

        const targetChannel = await guild.channels.cache.get(channel);
        await targetChannel.send(replyOptions);
    } else {
        return console.error(new Error('[PULSAR] Invalid event type'));
    }
};
