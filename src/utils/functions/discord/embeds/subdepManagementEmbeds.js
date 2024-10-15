export const sendSubdepMemberList = async ({
  pulsar,
  interaction,
  mongo,
  type,
  subdep,
  title,
  mongoQuery,
  depType
}) => {
  const members = await mongo.getAllMembers();

  let rankAbbreviations = {
    Agent: 'AG.',
    'Agent Principal': 'AP.',
    'Agent Sef Principal': 'ASP.',
    Inspector: 'INSP.',
    Comisar: 'CMS.',
    Chestor: 'CH.'
  };

  const instrList = [];
  for (let member of members) {
    if (member.functii.includes(type)) {
      instrList.push(
        `[${member.callsign}] ${member.nume} | ${
          rankAbbreviations[member.grad]
        } (${member.IDDiscord})`
      );
    }
  }

  let testCount = 0;
  let removedCount = 0;

  if (depType === 'Testeri') {
    testCount = await mongo.getTestsApproved(mongoQuery);
    removedCount = await mongo.getTestsRejected(mongoQuery);
  } else {
    testCount = await mongo.getTests(mongoQuery);
    removedCount = await mongo.getRemoved(mongoQuery);
  }

  const buttons = [
    {
      id: `${subdep.toLowerCase()}-menu-user-activity`,
      style: 'Secondary',
      label: '📋 Activitate Membru'
    },
    {
      id: `${subdep.toLowerCase()}-wipe`,
      style: 'Danger',
      label: '🗑️ Wipe',
      disabled: true
    }
  ];

  const rows = await pulsar.discordManager.menus.createButtonMenu({
    perLine: 2,
    buttons: buttons
  });

  if (instrList.length === 0) {
    instrList.push('-');
  }

  let fields = [
    {
      name: `Total ${depType}`,
      value: `\`${instrList.length}\``,
      inline: true
    }
  ];

  if (depType === 'Testeri') {
    fields.push(
      {
        name: 'Admiteri',
        value: `\`${testCount}\``,
        inline: true
      },
      {
        name: 'Respingeri',
        value: `\`${removedCount}\``,
        inline: true
      }
    );
  } else {
    fields.push(
      {
        name: 'Certificate oferite',
        value: `\`${testCount}\``,
        inline: true
      },
      {
        name: 'Certificate confiscate',
        value: `\`${removedCount}\``,
        inline: true
      }
    );
  }

  await pulsar.discordManager.embeds.createEmbed({
    footer: {
      text: `Subdepartament ${subdep}`
    },
    title: `**${title}**`,
    description: `\`\`\`\n${instrList.join('\n')}\n\`\`\``,
    fields: fields,
    interaction: interaction,
    components: rows,
    deferReply: true,
    ephemeral: true
  });
};

export const sendInstrActivityEmbed = async ({
  pulsar,
  interaction,
  mongo,
  targetID,
  subdep,
  type
}) => {
  const userActivity = await mongo.getFuncActivity(targetID, type);
  const userProfile = await mongo.getProfile(targetID);

  await pulsar.discordManager.embeds.createEmbed({
    footer: {
      text: `Subdepartament ${subdep}`
    },
    title: `**Activitate ${subdep} | ${userProfile.nume}**`,
    description: `Teste date: \`${userActivity}\``,
    interaction: interaction,
    deferReply: true,
    ephemeral: true
  });
};
