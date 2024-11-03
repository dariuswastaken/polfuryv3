import Discord from 'npm:discord.js';
import { SelectMenuBuilderOptions } from '../../../../interfaces/discord/menus/selectMenuBuilder.interfaces.ts';

export const createSelectMenu = async (
    params: SelectMenuBuilderOptions
): Promise<Discord.ActionRowBuilder> => {
    const { options, id, placeholder, channelType, maxValues, minValues } = params;
    let { type } = params;

    if (type === 'string') {
        type = new Discord.StringSelectMenuBuilder().addOptions(options || []);
    } else if (type === 'role') {
        type = new Discord.RoleSelectMenuBuilder().setMaxValues(maxValues).setMinValues(minValues);
    } else if (type === 'channel') {
        type = new Discord.ChannelSelectMenuBuilder()
            .setMaxValues(maxValues)
            .setMinValues(minValues)
            .setChannelTypes(channelType || Discord.ChannelType.GuildText);
    } else if (type === 'user') {
        type = new Discord.UserSelectMenuBuilder().setMaxValues(maxValues).setMinValues(minValues);
    }

    type.setCustomId(id);
    type.setPlaceholder(placeholder || 'Alege o optiune.');

    const row = new Discord.ActionRowBuilder().addComponents(type);

    return row;
};
