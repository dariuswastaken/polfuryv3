module.exports = {
  async sendSuccessEmbed(message, { pulsar, interaction }) {
    await pulsar.discordManager.embeds.createSuccessEmbed(
      'Succes',
      `${message}`,
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendWarningEmbed(message, { pulsar, interaction }) {
    await pulsar.discordManager.embeds.createWarningEmbed(
      'Atentie',
      `${message}`,
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendActivityUpdateRetryEmbed(message, { pulsar, interaction }) {
    await pulsar.discordManager.embeds.createErrorEmbed(
      'Eroare',
      `${message}`,
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendUserInfoEmbed({ pulsar, interaction, mongo, targetID }) {
    const targetProfile = await mongo.getProfile(targetID);

    let certificateList = [];
    for (let certificat of Object.keys(targetProfile.certificate)) {
      if (targetProfile.certificate[certificat] === true) {
        certificateList.push(certificat.toUpperCase());
      }
    }

    let sanctiuniFormatted = [];
    /*for (let sanctiune of targetProfile.sanctiuni) {
      let sancSplit = sanctiune.split(' | ');
      let formattedDate = await pulsar.utilsManager.time.formatTimestamp(
        parseInt(sancSplit[1]),
        'Europe/Bucharest'
      );
      const expiryDate = new Date(parseInt(sancSplit[1]));
      const currentDate = new Date();
      if (expiryDate > currentDate) {
        sanctiuniFormatted.push(`${sancSplit[0]} | ${formattedDate}`);
      }
    }*/

    if (targetProfile.sanctiuni.length === 0)
      targetProfile.sanctiuni.push('Nici o sanctiune activa.');

    if (sanctiuniFormatted.length === 0)
      sanctiuniFormatted.push('Nici o sanctiune activa.');
    if (targetProfile.functii.length === 0)
      targetProfile.functii.push('Nici o functie.');
    if (targetProfile.notite.length === 0)
      targetProfile.notite.push('Nici o notita.');

    let isOnDuty = await pulsar.webManager.isOnDuty(targetProfile.IDServer);
    let dutyStatus = isOnDuty ? 'Da' : 'Nu';

    await pulsar.discordManager.embeds.createEmbed({
      footer: { text: `Informatii - ${targetProfile.nume}` },
      fields: [
        {
          name: 'NUME',
          value: `${targetProfile.nume}`,
          inline: true
        },
        {
          name: 'CALLSIGN',
          value: `${targetProfile.callsign}`,
          inline: true
        },
        {
          name: 'GRAD',
          value: `${targetProfile.grad}`,
          inline: true
        },
        {
          name: 'ID',
          value: `${targetProfile.IDServer}`,
          inline: true
        },
        {
          name: 'DATA INTRARE',
          value: `${targetProfile.dataIntrare}`,
          inline: true
        },
        {
          name: 'ULTIMA ACTUALIZARE',
          value: `${targetProfile.dataActualizare}`,
          inline: true
        },
        {
          name: 'ON-DUTY?',
          value: `${dutyStatus}`,
          inline: true
        },
        {
          name: 'AVERTISMENTE',
          value: `${targetProfile.avertismente}`,
          inline: true
        },
        {
          name: 'CERTIFICATE',
          value: `\`\`\`\n${certificateList.join(' / ')}\`\`\``,
          inline: true
        },
        {
          name: 'FUNCTII',
          value: `\`\`\`\n${targetProfile.functii.join('\n')}\n\`\`\``,
          inline: true
        },
        {
          name: 'SANCTIUNI',
          value: `\`\`\`\n${targetProfile.sanctiuni.join('\n')}\n\`\`\``,
          inline: false
        },
        {
          name: 'NOTITE',
          value: `\`\`\`\n${targetProfile.notite.join('\n')}\n\`\`\``,
          inline: false
        }
      ],
      interaction: interaction,
      deferReply: true,
      ephemeral: true
    });
  },
  async sendUserActivityEmbed({
    pulsar,
    interaction,
    mongo,
    targetID,
    utils,
    week
  }) {
    const targetProfile = await mongo.getProfile(targetID);
    const userActivity = await mongo.getActivity(targetID, week);

    const [date1, date2] = week.split(' - ');

    let lastUpdateFormatted = await pulsar.utilsManager.time.formatTimestamp(
      userActivity.lastUpdate,
      'Europe/Bucharest'
    );

    const actions = await utils.activity.utils.getActionActivity(
      week,
      targetID,
      targetProfile.grad,
      pulsar.client
    );

    let concediu = await mongo.getLeave(targetID, week);
    if (!concediu) concediu = { days: [] };

    let activityGrade = await utils.algorithms.gradeAlgorithm(
      targetProfile.grad,
      {
        activity: userActivity.data.pontaj,
        reports: userActivity.data.rapoarte,
        fines: userActivity.data.amenzi,
        calls: userActivity.data.apeluri,
        actions: actions,
        leaveDays: concediu.days.length
      }
    );
    let activityNotes = await utils.activity.utils.createNotices(
      targetProfile.grad,
      {
        pontaj: userActivity.data.pontaj,
        rapoarte: userActivity.data.rapoarte,
        amenzi: userActivity.data.amenzi,
        apeluri: userActivity.data.apeluri,
        actiuni: actions
      }
    );
    let gradeRating = await utils.activity.utils.gradeRating(
      activityGrade,
      concediu.days.length
    );

    let actionsFmt = '';
    if (targetProfile.grad === 'Cadet' || targetProfile.grad === 'Agent') {
      actionsFmt = `${actions} (Participare)`;
    } else {
      actionsFmt = `${actions} (Organizare)`;
    }

    const [rankUpDay, rankUpMonth, rankUpYear] =
      targetProfile.dataActualizare.split('.');
    const [lastWeekDay, lastWeekMonth, lastWeekYear] = date2.split('.');

    const formattedRankupDateISO = `${rankUpYear}-${rankUpMonth}-${rankUpDay}`;
    const formattedLastWeekDateISO = `${lastWeekYear}-${lastWeekMonth}-${lastWeekDay}`;

    const rankUpDate = new Date(formattedRankupDateISO);
    const lastWeekDate = new Date(formattedLastWeekDateISO);

    const daysFromLastRankUp = await utils.dayConversion.getDifferenceInDays(
      rankUpDate,
      lastWeekDate
    );

    if (userActivity.data.lastLogin === 'Online')
      userActivity.data.lastLogin = `Online pe data de \n${
        lastUpdateFormatted.split(', ')[0]
      }, ora ${lastUpdateFormatted.split(', ')[1]}`;

    let concediuInfo = '';

    if (activityGrade > 10) activityGrade = 10;
    activityGrade = activityGrade.toFixed(2);

    if (concediu.days.length === 0) {
      concediuInfo = `**${concediu.days.length}** zile`;
    } else if (concediu.days.length === 1) {
      concediuInfo = `**${concediu.days.length}** zile **(⏫ 7.5%)**`;
    } else if (concediu.days.length === 2) {
      concediuInfo = `**${concediu.days.length}** zile **(⏫ 15%)**`;
    } else if (concediu.days.length === 3) {
      concediuInfo = `**${concediu.days.length}** zile **(⏫ 22.5%)**`;
    } else if (concediu.days.length === 4) {
      concediuInfo = `**${concediu.days.length}** zile **(⏫ 30%)**`;
    } else if (concediu.days.length >= 5) {
      concediuInfo = `**${concediu.days.length}** zile **(CO)**`;
      activityGrade = '-';
      activityNotes = ['- Concediu'];
    }

    await pulsar.discordManager.embeds.createEmbed({
      footer: {
        text: `${targetProfile.nume} | Saptamana ${userActivity.perioada}`
      },
      description: '**ACTIVITATE**',
      fields: [
        {
          name: 'PONTAJ',
          value: `${userActivity.data.pontaj} minute`,
          inline: true
        },
        {
          name: 'RAPOARTE',
          value: `${userActivity.data.rapoarte}`,
          inline: true
        },
        {
          name: 'AMENZI',
          value: `${userActivity.data.amenzi}`,
          inline: true
        },
        {
          name: 'APELURI',
          value: `${userActivity.data.apeluri}`,
          inline: true
        },
        {
          name: 'ACTIUNI',
          value: `${actionsFmt}`,
          inline: true
        },
        {
          name: 'ZILE CONCEDIU',
          value: `${concediuInfo}`,
          inline: true
        },
        {
          name: 'NOTA',
          value: `${activityGrade}`,
          inline: true
        },
        {
          name: 'MEDIE/ZI',
          value: `${(userActivity.data.pontaj / 7).toFixed(2)} minute`,
          inline: true
        },
        {
          name: 'RATING',
          value: `${gradeRating}`,
          inline: true
        },
        {
          name: 'ZILE DE LA ULTIMUL UP',
          value: `${daysFromLastRankUp} zile (La sfarsitul saptamanii alese)`,
          inline: true
        },
        {
          name: 'ULTIMA LOGARE',
          value: `${userActivity.data.lastLogin}`,
          inline: true
        },
        {
          name: 'ULTIMA ACTUALIZARE',
          value: `${lastUpdateFormatted}`,
          inline: true
        },
        {
          name: 'NOTITE ACTIVITATE',
          value: `${activityNotes.join('\n')}`,
          inline: false
        }
      ],
      interaction: interaction,
      deferReply: true,
      ephemeral: true
    });
  },
  async sendSubdepMemberList({
    pulsar,
    interaction,
    mongo,
    type,
    subdep,
    title,
    mongoQuery,
    depType
  }) {
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
  },
  async sendUserCooldownList({ pulsar, interaction, mongo, targetID }) {
    const userCooldowns = await mongo.getCooldowns(targetID);

    let fields = [];
    for (let cooldown of userCooldowns) {
      const expirationDate = new Date(cooldown.expiration);
      if (expirationDate.getTime() > Date.now()) {
        let formattedDate = await pulsar.utilsManager.time.formatTimestamp(
          expirationDate,
          'Europe/Bucharest'
        );
        fields.push({
          name: `Cooldown ${cooldown.tip_.toUpperCase()}`,
          value: `Expira pe data de ${formattedDate}`,
          inline: true
        });
      }
    }

    await pulsar.discordManager.embeds.createEmbed({
      fields: fields,
      description: '**Lista Cooldown-uri**',
      interaction: interaction,
      deferReply: true,
      ephemeral: true
    });
  },
  async sendInstrActivityEmbed({
    pulsar,
    interaction,
    mongo,
    targetID,
    subdep,
    type
  }) {
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
  },
  async sendUpList({ pulsar, interaction, utils, mongo, week }) {
    const upList = await mongo.getEntryList('up', week);

    let formattedArray = [];
    for (let userID of upList.list) {
      const member = await mongo.getProfile(userID);

      const [day, month, year] = await member.dataActualizare.split('.');
      const dataActualizareF = `${year}-${month}-${day}`;
      const dataActualizare = new Date(dataActualizareF);
      const dataCurenta = new Date();
      const diffInDays = await utils.dayConversion.getDifferenceInDays(
        dataActualizare,
        dataCurenta
      );

      const userActivity = await mongo.getActivity(member.IDDiscord, week);

      if (!userActivity) {
        continue;
      }

      const actions = await utils.activity.utils.getActionActivity(
        week,
        member.IDDiscord,
        member.grad,
        pulsar.client
      );

      let concediu = await mongo.getLeave(member.IDDiscord, week);
      if (!concediu) concediu = { days: [] };

      let activityGrade = await utils.algorithms.gradeAlgorithm(member.grad, {
        activity: userActivity.data.pontaj,
        reports: userActivity.data.rapoarte,
        fines: userActivity.data.amenzi,
        calls: userActivity.data.apeluri,
        actions: actions,
        leaveDays: concediu.days.length
      });

      let gradeRating = await utils.activity.utils.gradeRating(
        activityGrade,
        concediu.days.length
      );

      if (activityGrade > 10) activityGrade = 10;

      formattedArray.push(
        `[${member.callsign}] ${member.nume} | Nota: ${activityGrade} | Rating: ${gradeRating} | Zile: ${diffInDays}`
      );
    }

    await pulsar.discordManager.embeds.createEmbed({
      description: `**Lista Up-uri**\n\n\`\`\`\n${formattedArray.join(
        '\n'
      )}\n\`\`\`\n\n**Total: ${upList.list.length}**`,
      interaction: interaction,
      deferReply: true,
      ephemeral: true
    });
  },
  async sendOutList({ pulsar, interaction, utils, mongo, week }) {
    const outList = await mongo.getEntryList('out', week);

    let formattedArray = [];
    for (let userID of outList.list) {
      const member = await mongo.getProfile(userID);

      const [day, month, year] = await member.dataActualizare.split('.');
      const dataActualizareF = `${year}-${month}-${day}`;
      const dataActualizare = new Date(dataActualizareF);
      const dataCurenta = new Date();
      const diffInDays = await utils.dayConversion.getDifferenceInDays(
        dataActualizare,
        dataCurenta
      );

      const userActivity = await mongo.getActivity(member.IDDiscord, week);

      if (!userActivity) {
        continue;
      }

      const actions = await utils.activity.utils.getActionActivity(
        week,
        member.IDDiscord,
        member.grad,
        pulsar.client
      );

      let concediu = await mongo.getLeave(member.IDDiscord, week);
      if (!concediu) concediu = { days: [] };

      let activityGrade = await utils.algorithms.gradeAlgorithm(member.grad, {
        activity: userActivity.data.pontaj,
        reports: userActivity.data.rapoarte,
        fines: userActivity.data.amenzi,
        calls: userActivity.data.apeluri,
        actions: actions,
        leaveDays: concediu.days.length
      });

      let gradeRating = await utils.activity.utils.gradeRating(
        activityGrade,
        concediu.days.length
      );

      if (activityGrade > 10) activityGrade = 10;

      if (diffInDays < 7) {
        continue;
      }

      formattedArray.push(
        `[${member.callsign}] ${member.nume} | Nota: ${activityGrade} | Rating: ${gradeRating} | Zile: ${diffInDays} | Zile de concediu: ${concediu.days.length}`
      );
    }

    await pulsar.discordManager.embeds.createEmbed({
      description: `**Lista Out-uri**\n\n\`\`\`\n${formattedArray.join(
        '\n'
      )}\n\`\`\`\n\n**Total: ${outList.list.length}**`,
      interaction: interaction,
      deferReply: true,
      ephemeral: true
    });
  }
};
