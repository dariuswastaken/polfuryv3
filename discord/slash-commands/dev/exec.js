const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('exec')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .setDescription('Dev CMD'),
  enabled: false,
  async execute(pulsar, interaction, mongo, utils) {
    if (interaction.user.id !== '1027526587031232552') return;

    await mongo.wipeSanctions();

  }
};
