const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = class Command {
  constructor(type, optionType, { name, description, options, permissions }, execute) {
    this.type = type;
    if (typeof execute !== 'function') {
      throw new Error('[PULSAR COMMAND BUILDER] execute is not a function');
    }
    if (this.type === 'slash') {
      this.data = new SlashCommandBuilder()
        .setName(name)
        .setDescription(description);
      switch (optionType) {
        case 'string':
          for (const option of options) {
            this.data.addStringOption({ ...option });
          }
          break;
        case 'number':
          for (const option of options) {
            this.data.addNumberOption({ ...option });
          }
          break;
      }
      if (permissions) {
        this.data.setDefaultMemberPermissions(
          PermissionsBitField.resolve(permissions)
        );
      }
    } else {
      this.data = {
        name: name,
        description: description,
        options: options
      };
    }
  }
};