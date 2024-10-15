export default {
  name: 'highspeed-menu-instructori',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    await utils.discord.embeds.sendSubdepMemberList({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo,
      type: 'Instr. HS',
      subdep: 'Highspeed',
      title: 'LISTA INSTRUCTORI HS',
      mongoQuery: 'highspeed',
      depType: 'Instructori Highspeed'
    });
  }
};
