const Discord = require('discord.js');

module.exports = {
  async createButtonMenu(options = {}) {
    const perLine = options.perLine || 4;
    const buttons = options.buttons || [];

    const rows = [];

    for (let i = 0; i < buttons.length; i += perLine) {
      const currentLine = buttons.slice(i, i + perLine);

      let row = new Discord.ActionRowBuilder();

      currentLine.forEach(async (button) => {
        row.addComponents(
          new Discord.ButtonBuilder()
            .setCustomId(button.id)
            .setLabel(button.label)
            .setStyle(button.style)
            .setDisabled(button.disabled || false)
        );
      });

      if (row.components.length > 0) {
        rows.push(row);
      }
    }

    return rows;
  },

  async createSelectMenu(options = {}) {
    let type;

    if (options.type === 'string') {
      type = new Discord.StringSelectMenuBuilder().addOptions(
        options.options || []
      );
    } else if (options.type === 'role') {
      type = new Discord.RoleSelectMenuBuilder()
        .setMaxValues(options.maxValues)
        .setMinValues(options.minValues);
    } else if (options.type === 'channel') {
      type = new Discord.ChannelSelectMenuBuilder()
        .setMaxValues(options.maxValues)
        .setMinValues(options.minValues)
        .setChannelTypes(Discord.ChannelType.GuildText);
    } else if (options.type === 'user') {
      type = new Discord.UserSelectMenuBuilder()
        .setMaxValues(options.maxValues)
        .setMinValues(options.minValues);
    }

    type.setCustomId(options.id);
    type.setPlaceholder(options.placeholder || 'Alege o optiune.');

    const row = new Discord.ActionRowBuilder().addComponents(type);

    return row;
  }
};
