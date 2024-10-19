export const sendRankChoiceMenu = async ({ pulsar, interaction, targetID }) => {
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
};

export const sendWeekChoiceMenu = async ({ pulsar, interaction, mongo, title }) => {
  const activityWeeks = await mongo.getAllActivityWeeks();
  let options = [];
  for (let week of activityWeeks) {
    options.push({
      label: `${week}`,
      value: `${week}`
    });
  }
  const menu = await pulsar.discordManager.menus.createSelectMenu({
    type: 'string',
    options: options,
    id: `top-activity-week-select/${interaction.user.id}`,
    placeholder: 'Alege o saptamana'
  });

  await pulsar.discordManager.embeds.createDefaultEmbed(
    'Alege o saptamana din meniul de mai jos.',
    {
      title: `${title}`,
      interaction: interaction,
      components: [menu],
      ephemeral: true,
      deferReply: true
    }
  );
};