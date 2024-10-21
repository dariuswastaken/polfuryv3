import Discord from 'npm:discord.js';

export const createButtonMenu = async ({ perLine, buttons }) => {
    const bPerLine = perLine || 4;
    const bButtons = buttons || [];

    const rows = [];

    for (let i = 0; i < bButtons.length; i += bPerLine) {
        const currentLine = bButtons.slice(i, i + bPerLine);

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
};
