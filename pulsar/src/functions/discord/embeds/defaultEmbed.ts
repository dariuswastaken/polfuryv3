import Discord from 'npm:discord.js';
import { CreateDefaultEmbedOptions } from '../../../../interfaces/discord/embeds/defaultEmbed.interfaces.ts';

export const createDefaultEmbed = async (
    description: string,
    options: CreateDefaultEmbedOptions
): Promise<void> => {
    const embed = new Discord.EmbedBuilder().setDescription(description).setColor('#D37506');

    const {
        fields,
        footer,
        title,
        image,
        thumbnail,
        interaction,
        message,
        channel,
        components,
        edit,
        ephemeral,
        deferReply,
        followUp,
        guild,
        files
    } = options;

    if (fields) embed.addFields(fields);
    if (footer) embed.setFooter(footer);
    if (title) embed.setTitle(title);
    if (image) embed.setImage(image);
    if (thumbnail) embed.setThumbnail(thumbnail);

    const replyOptions = { embeds: [embed], ephemeral, components, files };

    if (interaction) {
        if (deferReply) {
            await interaction.editReply(replyOptions);
        } else if (followUp) {
            await interaction.followUp(replyOptions);
        } else {
            await interaction.reply(replyOptions);
        }
    } else if (message) {
        if (edit) {
            await message.edit({ embeds: [embed], components });
        } else {
            await message.channel.send({ embeds: [embed], components });
        }
    } else if (channel) {
        if (!guild) {
            return console.error(new Error('[PULSAR] No guild specified for DEFAULT_EMBED'));
        }

        const targetChannel = await guild.channels.cache.get(channel);
        await targetChannel.send({ embeds: [embed], components });
    } else {
        return console.error(new Error('[PULSAR] Invalid event type'));
    }
};
