export const sendChestorRankChoiceMenu = async ({
  pulsar,
  interaction,
  targetID
}) => {
  const menu = await pulsar.discordManager.menus.createSelectMenu({
    type: 'string',
    options: [
      {
        label: 'Comisar',
        value: 'Comisar'
      },
      {
        label: 'Inspector',
        value: 'Inspector'
      }
    ],
    id: `chestor-schimbare-grad-select/${targetID}`,
    placeholder: 'Alege un grad'
  });

  await pulsar.discordManager.embeds.createDefaultEmbed(
    'Alege un grad din meniul de mai jos.',
    {
      title: 'Meniu Chestor Schimbare Grad',
      interaction: interaction,
      components: [menu],
      ephemeral: true,
      deferReply: true
    }
  );
};

export const sendChestorWeekChoiceMenu = async ({ pulsar, interaction, mongo, customID, title }) => {
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
    id: `${customID}/${interaction.user.id}`,
    placeholder: 'Alege o saptamana'
  });

  await pulsar.discordManager.embeds.createDefaultEmbed(
    'Alege o saptamana din meniul de mai jos.',
    {
      title: title,
      interaction: interaction,
      components: [menu],
      ephemeral: true,
      deferReply: true
    }
  );
};

export const sendListWeekChoiceMenu = async ({
  pulsar,
  interaction,
  mongo
}) => {
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
    id: `list-select/${interaction.user.id}`,
    placeholder: 'Alege o saptamana'
  });

  await pulsar.discordManager.embeds.createDefaultEmbed(
    'Alege o saptamana din meniul de mai jos.',
    {
      title: 'Meniu Selectare Saptamana - Liste',
      interaction: interaction,
      components: [menu],
      ephemeral: true,
      deferReply: true
    }
  );
};

export const sendListDeleteWeekChoiceMenu = async ({
  pulsar,
  interaction,
  mongo
}) => {
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
    id: `list-delete-select/${interaction.user.id}`,
    placeholder: 'Alege o saptamana'
  });

  await pulsar.discordManager.embeds.createDefaultEmbed(
    'Alege o saptamana din meniul de mai jos.',
    {
      title: 'Meniu Selectare Saptamana - Stergere Liste',
      interaction: interaction,
      components: [menu],
      ephemeral: true,
      deferReply: true
    }
  );
};
