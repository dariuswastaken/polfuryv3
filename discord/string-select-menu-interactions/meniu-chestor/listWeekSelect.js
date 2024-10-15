export default {
  name: 'list-select',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    let week = interaction.values[0];

    await utils.discord.buttonMenus.sendListTypeSelectMenu({
      pulsar: pulsar,
      interaction: interaction,
      week: week
    });
  }
};
