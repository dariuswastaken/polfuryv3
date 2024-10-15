import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  PermissionsBitField
} from 'npm:discord.js';

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Demitere')
    .setType(ApplicationCommandType.User)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const targetID = await interaction.options.getUser('user').id;
    const targetProfile = await mongo.getProfile(targetID);
    const targetMember = await interaction.guild.members.fetch(targetID);

    if (targetID === interaction.user.id) {
      await utils.discord.errors.selfError(pulsar, interaction);
      return;
    }

    if (!targetProfile) {
      await utils.discord.errors.noProfileError(pulsar, interaction);
      return;
    }

    if (
      targetMember.roles.highest.position >=
      interaction.member.roles.highest.position
    ) {
      await utils.discord.errors.roleHierarchyError(pulsar, interaction);
      return;
    }

    await utils.discord.buttonMenus.sendMenuDemitere({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo,
      utils: utils,
      targetID: targetID
    });
  }
};
