module.exports = {
  sendRankChoiceMenu: async ({ pulsar, interaction, targetID }) => {
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: [
        {
          label: 'Agent Sef Principal',
          value: 'Agent Sef Principal'
        },
        {
          label: 'Agent Principal',
          value: 'Agent Principal'
        },
        {
          label: 'Agent',
          value: 'Agent'
        },
        {
          label: 'Cadet',
          value: 'Cadet'
        }
      ],
      id: `schimbare-grad-select/${targetID}`,
      placeholder: 'Alege un grad'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege un grad din meniul de mai jos.',
      {
        title: 'Meniu Schimbare Grad',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
