const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  PermissionsBitField
} = require('discord.js');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Meniu Conducere')
    .setType(ApplicationCommandType.User)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const targetID = await interaction.options.getUser('user').id;
    const targetProfile = await mongo.getProfile(targetID);

    if (!targetProfile) {
      await utils.discord.errors.noProfileError(pulsar, interaction);
      return;
    }

    await utils.discord.buttonMenus.sendMenuConducere({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo,
      utils: utils,
      targetID: targetID
    });
  }
};
