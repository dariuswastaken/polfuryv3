import { SlashCommandBuilder, PermissionsBitField } from 'npm:discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('subdep-menu')
    .setDescription('Deschide meniul de gestionare a subdepartamentelor')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageNicknames),
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    await utils.discord.buttonMenus.sendSubdepMenu({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo
    });
  }
};
