const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  StringSelectMenuBuilder
} = require('discord.js');

module.exports = {
  async createModal(options = {}) {
    const modal = new ModalBuilder()
      .setCustomId(options.id)
      .setTitle(options.title);

    let rows = [];

    for (let input of options.inputs) {
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
