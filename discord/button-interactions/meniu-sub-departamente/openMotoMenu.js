export default {
  name: 'moto-menu',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    await utils.discord.buttonMenus.sendSubdepSubMenu({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo,
      subdep: 'Moto',
      type: 'moto'
    });
  }
};
