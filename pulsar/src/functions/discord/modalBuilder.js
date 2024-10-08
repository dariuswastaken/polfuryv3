const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
} = require('discord.js');

module.exports = {
  createModal: async ({ id, title, inputs }) => {
    const modal = new ModalBuilder()
      .setCustomId(id)
      .setTitle(title);

    let rows = [];

    for (let input of inputs) {
      rows.push(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId(input.id)
            .setPlaceholder(input.placeholder)
            .setLabel(input.label)
            .setRequired(input.required)
            .setStyle(TextInputStyle[input.style])
        )
      );
    }

    modal.addComponents(rows);

    return modal;
  }
};
