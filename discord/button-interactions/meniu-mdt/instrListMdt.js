export default {
  name: 'mdt-menu-instructori',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils, botconfig) {
    await interaction.deferReply({ ephemeral: true });

    await utils.discord.embeds.sendSubdepMemberList(
      {
        pulsar: pulsar,
        interaction: interaction,
        mongo: mongo,
        type: 'Instr. MDT',
        subdep: 'MDT',
        title: 'LISTA INSTRUCTORI MDT',
        mongoQuery: 'mdt',
        depType: 'Instructori MDT'
      },
      botconfig
    );
  }
};
