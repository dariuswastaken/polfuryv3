const Discord = require('discord.js');

module.exports = {
  createButtonMenu: async ({ perLine, buttons }) => {
    const perLine = perLine || 4;
    const buttons = buttons || [];

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
}