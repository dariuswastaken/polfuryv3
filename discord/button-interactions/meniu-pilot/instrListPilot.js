module.exports = {
  name: 'pilot-menu-instructori',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    await utils.discord.embeds.sendSubdepMemberList({
      pulsar: pulsar,
      interaction: interaction,
      mongo: mongo,
      type: 'Instr. Pilot',
      subdep: 'Pilot',
      title: 'LISTA INSTRUCTORI PILOT',
      mongoQuery: 'pilot',
      depType: 'Instructori Pilot'
    });
  }
};
