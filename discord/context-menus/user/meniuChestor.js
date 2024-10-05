const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  PermissionsBitField
} = require('discord.js');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Meniu Chestor')
    .setType(ApplicationCommandType.User)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    if (!interaction.member.roles.cache.some((r) => r.id === '1119645178148442152')) {
      await utils.discord.errors.noPermissionError(pulsar, interaction);
      return;
    }

    const targetID = await interaction.options.getUser('user').id;
    const targetProfile = await mongo.getProfile(targetID);

    if (!targetProfile) {
      await utils.discord.errors.noProfileError(pulsar, interaction);
      return;
    }
    
    await utils.discord.buttonMenus.sendMenuChestor({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo,
      utils: utils,
      targetID: targetID
    });
  }
};
