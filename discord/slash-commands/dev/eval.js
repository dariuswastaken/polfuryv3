import { SlashCommandBuilder, PermissionsBitField } from 'npm:discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eval')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .setDescription('Dev CMD')
    .addStringOption((option) =>
      option.setName('code').setDescription('Code to compile').setRequired(true)
    ),
  enabled: false,
  async execute(pulsar, interaction, mongo, utils) {
    if (interaction.user.id !== '1027526587031232552') return;

    await interaction.deferReply({ ephemeral: true });

    const code = interaction.options.getString('code');

    let result;

    try {
      result = eval(`(async () => { return ${code} })()`);

      if (result instanceof Promise || result instanceof Object) {
        result = await result;
      }

      pulsar.discordManager.embeds.createDefaultEmbed(
        `**Result:**\n\`\`\`js\n${result}\n\`\`\`\n\n**Type:**\n\`\`\`js\n${typeof result}\n\`\`\`\n\n**Source:**\n\`\`\`js\n${code}\n\`\`\``,
        {
          interaction: interaction,
          ephemeral: true,
          deferReply: true
        }
      );
    } catch (error) {
      pulsar.discordManager.embeds.createErrorEmbed(
        'Compile Error',
        `**Error:**\n\`\`\`${error}\`\`\`\n\n**Source:**\n\`\`\`js\n${code}\n\`\`\``,
        {
          interaction: interaction,
          ephemeral: true,
          deferReply: true
        }
      );

      console.log(error);
      throw error;
    }
  }
};
