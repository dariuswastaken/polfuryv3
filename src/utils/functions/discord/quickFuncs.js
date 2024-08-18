const {
  ThreadAutoArchiveDuration,
  ChannelType,
  PermissionsBitField
} = require('discord.js');
const dayConversion = require('../dayConversion');
const { mongo } = require('mongoose');
const { flags } = require('../activity/flags');

module.exports = {
  async addAcademiePD({ interaction, mongo, targetID, data }) {
    await mongo.createProfileAcademician({
      nume: data.nume,
      IDDiscord: data.IDDiscord,
      IDServer: data.IDServer,
      dataIntrare: data.dataIntrare,
      dataActualizare: data.dataActualizare,
      esuariTest: 0,
      cooldown: null,
      prezentaAcademie: false,
      suspendat: false
    });

    const user = await interaction.guild.members.fetch(targetID);

    await user.setNickname(`[AC] ${data.nume}`);
    await user.roles.add('1094603212213989436');
  },
  async addReintegrarePD({ interaction, mongo, targetID, data }) {
    const user = await interaction.guild.members.fetch(targetID);
    const callsign = await mongo.getAvailableCallsign('Agent');

    await mongo.updateCallsign('Agent', callsign.id, true);
    await mongo.createProfile({
      nume: data.nume,
      IDDiscord: data.IDDiscord,
      callsign: callsign.id,
      IDServer: data.IDServer,
      grad: 'Agent',
      corp: 'AGENTI',
      dataIntrare: data.dataIntrare,
      dataActualizare: data.dataActualizare,
      certificate: {
        radio: false,
        moto: false,
        pilot: false,
        highspeed: false,
        mdt: false
      }
    });

    await user.setNickname(`[${callsign.id}] ${data.nume}`);
    await user.roles.add([
      '1094603197718478938',
      '1110261016064958561',
      '1110257492555989043',
      '1094603202051194990'
    ]);
  },
  async addMemberPD({ interaction, mongo, targetID, data }) {
    const user = await interaction.guild.members.fetch(targetID);
    const callsign = await mongo.getAvailableCallsign('Cadet');

    await mongo.updateCallsign('Cadet', callsign.id, true);
    await mongo.createProfile({
      nume: data.nume,
      IDDiscord: data.IDDiscord,
      callsign: callsign.id,
      IDServer: data.IDServer,
      grad: 'Cadet',
      corp: 'AGENTI',
      dataIntrare: data.dataIntrare,
      dataActualizare: data.dataActualizare,
      certificate: {
        radio: false,
        moto: false,
        pilot: false,
        highspeed: false,
        mdt: false
      }
    });
    await mongo.deleteProfileAcademician(targetID);

    await user.roles.remove('1094603212213989436');
    await user.roles.add([
      '1110257492555989043',
      '1094603202051194990',
      '1110261016064958561',
      '1094603198695755816'
    ]);
    await user.setNickname(`[${callsign.id}] ${data.nume}`);
  },
  async addCertificat({ interaction, mongo, targetID, certificat }) {
    const targetUser = await interaction.guild.members.fetch(targetID);
    switch (certificat) {
      case 'radio':
        await mongo.updateCertificate(targetID, 'radio', true);
        break;
      case 'moto':
        await mongo.updateCertificate(targetID, 'moto', true);
        await targetUser.roles.add([
          '1103417201182113793',
          '1102707472344559638'
        ]);
        break;
      case 'pilot':
        await mongo.updateCertificate(targetID, 'pilot', true);
        await targetUser.roles.add([
          '1103417201182113793',
          '1102708810247847987'
        ]);
        break;
      case 'highspeed':
        await mongo.updateCertificate(targetID, 'highspeed', true);
        await targetUser.roles.add([
          '1103417201182113793',
          '1102706216985178122'
        ]);
        break;
      case 'mdt':
        await mongo.updateCertificate(targetID, 'mdt', true);
        break;
    }
  },
  async removeCertificat({ interaction, mongo, targetID, certificat }) {
    const targetUser = await interaction.guild.members.fetch(targetID);
    switch (certificat) {
      case 'radio':
        await mongo.updateCertificate(targetID, 'radio', false);
        break;
      case 'moto':
        await mongo.updateCertificate(targetID, 'moto', false);
        await targetUser.roles.remove(['1102707472344559638']);
        break;
      case 'pilot':
        await mongo.updateCertificate(targetID, 'pilot', false);
        await targetUser.roles.remove(['1102708810247847987']);
        break;
      case 'highspeed':
        await mongo.updateCertificate(targetID, 'highspeed', false);
        await targetUser.roles.remove(['1102706216985178122']);
        break;
      case 'mdt':
        await mongo.updateCertificate(targetID, 'mdt', false);
        break;
    }
  },
  async createSanctionThread({
    pulsar,
    utils,
    interaction,
    mongo,
    sanction,
    reason
  }) {
    const forum = await interaction.guild.channels.cache.get(
      '1205145266349670440'
    );

    const buttons = [
      {
        id: `sanction-thread-send/${sanction.sanctionID}`,
        style: 'Success',
        label: '📩 Trimite Sanctiunea'
      },
      {
        id: `sanction-thread-cancel/${sanction.sanctionID}`,
        style: 'Danger',
        label: '❌ Anuleaza Sanctiunea'
      }
    ];

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 2,
      buttons: buttons
    });

    await mongo.closeSanctionList(sanction.sanctionID);

    const sanctionKeys = {
      ts25: 'Taiere Salariala 25%',
      ts50: 'Taiere Salariala 50%',
      ts75: 'Taiere Salariala 75%',
      suspendareup: 'Suspendare UP',
      suspendaresias: 'Suspendare SIAS',
      pifd: 'Punere in folosul Dep.',
      av: 'Avertisment',
      down: 'Down',
      demitere: 'Demitere'
    };

    const formattedSanctions = [];
    for (let sanc of sanction.sanctions) {
      formattedSanctions.push(
        `${sanctionKeys[sanc.split(' - ')[0]]} - ${sanc.split(' - ')[1]}`
      );
    }

    const sanctionedProfile = await mongo.getProfile(sanction.sanctionedID);
    const embed = await pulsar.discordManager.embeds.createForumThreadEmbed({
      guild: interaction.guild,
      components: rows,
      title: `Sanctiune ${sanctionedProfile.nume} | ID Sanctiune: ${sanction.sanctionID}`,
      description: `**Nume sanctionat/a:** ${
        sanctionedProfile.nume
      }\n**Callsign:** ${sanctionedProfile.callsign}\n**ID Sanctionat/a:** ${
        sanctionedProfile.IDServer
      }\n**ID Discord:** ${
        sanctionedProfile.IDDiscord
      }\n\n**Sanctiuni:**\n\`\`\`${formattedSanctions.join(
        '\n'
      )}\`\`\`\n\n**Motiv:** ${reason}\n**Autor:** ${
        interaction.user.username
      } (${interaction.user.id})`
    });

    await forum.threads.create({
      name: `Sanctiune ${sanctionedProfile.nume} | ID Sanctiune: ${sanction.sanctionID}`,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
      reason: `Sanction ID: ${sanction.sanctionID} - Autor => ${interaction.user.username} (${interaction.user.id})`,
      message: {
        embeds: [embed.embeds],
        components: embed.components
      }
    });

    await utils.discord.embeds.sendSuccessEmbed(
      'Thread-ul a fost creat cu succes.',
      {
        pulsar: pulsar,
        interaction: interaction
      }
    );
  },
  async addSanctionToMember({ pulsar, mongo, userID, sanctions }) {
    const sanctionKeys = {
      ts25: 'Taiere Salariala 25%',
      ts50: 'Taiere Salariala 50%',
      ts75: 'Taiere Salariala 75%',
      suspendareup: 'Suspendare UP',
      suspendaresias: 'Suspendare SIAS',
      pifd: 'Punere in folosul Dep.',
      av: 'Avertisment',
      down: 'Down',
      demitere: 'Demitere'
    };

    const formattedSancList = [];
    for (let sanc of sanctions) {
      let sancKey = sanctionKeys[sanc.split(' - ')[0]];
      if (sancKey !== 'Avertisment') {
        let expiryDate = sanc.split(' - ')[1];
        if (expiryDate === 'Permanent') {
          formattedSancList.push(`${sancKey} - Permanent`);
        } else {
          let date = new Date();
          date.setDate(date.getDate() + parseInt(expiryDate));
          let expDate = await pulsar.utilsManager.time.formatTimestamp(
            date,
            'Europe/Bucharest'
          );
          formattedSancList.push(`${sancKey} - ${expDate}`);
        }
      } else if (sancKey === 'Avertisment') {
        await mongo.addAvM(userID);
      }
    }

    await mongo.addSanctionsM(userID, formattedSancList);
  },
  async createSanctionPrivateChannel({
    pulsar,
    interaction,
    mongo,
    sanctionID
  }) {
    const sanction = await mongo.getSanction(sanctionID);
    const sanctionedProfile = await mongo.getProfile(sanction.sanctionedID);

    const sanctionedMember = await interaction.guild.members.fetch(
      sanction.sanctionedID
    );

    const channel = await interaction.guild.channels.create({
      name: `sanctiune-${sanctionedProfile.nume}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: sanctionedMember.id,
          allow: [PermissionsBitField.Flags.ViewChannel]
        }
      ]
    });

    const buttons = [
      {
        id: `close-sanction-channel/${sanctionedProfile.IDDiscord}/${sanctionID}`,
        style: 'Primary',
        label: '✅ Am inteles'
      }
    ];

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 1,
      buttons: buttons
    });

    const sanctionKeys = {
      ts25: 'Taiere Salariala 25%',
      ts50: 'Taiere Salariala 50%',
      ts75: 'Taiere Salariala 75%',
      suspendareup: 'Suspendare UP',
      suspendaresias: 'Suspendare SIAS',
      pifd: 'Punere in folosul Dep.',
      av: 'Avertisment',
      down: 'Down',
      demitere: 'Demitere'
    };

    const formattedSanctions = [];
    for (let sanc of sanction.sanctions) {
      formattedSanctions.push(
        `${sanctionKeys[sanc.split(' - ')[0]]} - ${sanc.split(' - ')[1]}`
      );
    }

    await channel.send({ content: `<@${sanctionedProfile.IDDiscord}>` });
    await pulsar.discordManager.embeds.createDefaultEmbed(
      `**Acesta este un mesaj automat, mai jos ai detaliile sanctiunii.**\n**Daca ai nelamuriri, poti da tag persoanei responsabile pentru sanctiunea ta.**\n\n**Sanctionat/a de:** <@${
        sanction.authorID
      }>\n**Motiv:** ${
        sanction.reason
      }\n\n**Sanctiuni:**\n\n\`\`\`\n${formattedSanctions.join('\n')}\`\`\``,
      {
        guild: interaction.guild,
        channel: channel.id,
        title: `Sanctiune ${sanctionedProfile.nume}`,
        footer: { text: `ID Sanctiune: ${sanction.sanctionID}` },
        components: rows
      }
    );
  },

  async addFunc(interaction, userID, mongo, func) {
    const roleIDs = {
      'Instr. Radio': '1094603229456769155',
      'Instr. MDT': '1147540100327157780',
      'Instr. HS': '1102705257802387518',
      'Instr. Pilot': '1094603228668248094',
      'Instr. Moto': '1094603206203547758',
      Tester: '1094603202734854225'
    };
    const member = await interaction.guild.members.fetch(userID);
    await member.roles.add(roleIDs[func]);
    await mongo.addFunc(userID, func);
  },

  async removeFunc(interaction, userID, mongo, func) {
    const roleIDs = {
      'Instr. Radio': '1094603229456769155',
      'Instr. MDT': '1147540100327157780',
      'Instr. HS': '1102705257802387518',
      'Instr. Pilot': '1094603228668248094',
      'Instr. Moto': '1094603206203547758',
      Tester: '1094603202734854225'
    };
    const member = await interaction.guild.members.fetch(userID);
    await member.roles.remove(roleIDs[func]);
    await mongo.removeFunc(userID, func);
  },
  async createChannelTranscript({ interaction, channelID, type }) {
    const channel = await interaction.guild.channels.cache.get(channelID);
    let messages = await channel.messages.fetch({ limit: 100 });
    let sortedMessages = Array.from(messages.values()).sort(
      (a, b) => a.createdTimestamp - b.createdTimestamp
    );

    let transcriptHTML = `
    <html>
    <head>
        <title>Transcript ${type}</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #36393f; color: #dcddde; }
            .message { margin-bottom: 1em; }
            .timestamp { color: #72767d; font-size: 0.8em; }
            .username { color: #b9bbbe; font-weight: bold; }
            .content { color: #dcddde; }
            .avatar { border-radius: 50%; width: 32px; height: 32px; }
            .role { color: #b9bbbe; font-size: 0.8em; }
        </style>
    </head>
    <body>
        ${sortedMessages
          .map(
            (message) => `
            <div class="message">
                <img class="avatar" src="${message.author.displayAvatarURL({
                  format: 'png',
                  dynamic: true
                })}" alt="${message.author.username}/userAvatar">
                <span class="timestamp">${new Date(
                  message.createdTimestamp
                ).toLocaleString('ro-RO', {
                  timeZone: 'Europe/Bucharest'
                })}</span>
                <span class="username">${message.author.username}</span>
                <p class="content">${message.cleanContent}</p>
            </div>
        `
          )
          .join('')}
    </body>
    </html>
    `;

    const transcript = Buffer.from(transcriptHTML, 'utf-8');
    return transcript;
  },
  async genUpList({ pulsar, interaction, mongo, week }) {
    const members = await mongo.getAllMembers();

    for (let member of members) {
      try {
        await interaction.guild.members.fetch(member.IDDiscord);
        await mongo.getActivity(member.IDDiscord, week);
      } catch (error) {
        console.log(
          `[USER NOT FOUND] ${member.IDDiscord} (${member.nume}) not found in the server.`
        );
      }
    }
  },
  async createUpList({ interaction, pulsar, utils, mongo, week }) {
    await pulsar.discordManager.embeds.createDefaultEmbed(`**(UP)** Se creeaza lista pentru saptamana ${week}...`, {
      interaction: interaction,
      ephemeral: true,
      deferReply: true,
    });

    const members = await mongo.getAllMembers();
    let userIDList = [];
    for (let member of members) {
      await pulsar.discordManager.embeds.createDefaultEmbed(`**(UP)** Se verifica activitatea pentru **${member.nume}** (${member.IDDiscord})`, {
        interaction: interaction,
        ephemeral: true,
        deferReply: true,
      });

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

      if (member.grad === 'Cadet') {
        if (
          diffInDays < flags['Cadet'].up.requiredDays &&
          activityGrade !== 10
        ) {
          continue;
        }
        if (
          gradeRating !== flags['Cadet'].up.gradeRating[0] &&
          gradeRating !== flags['Cadet'].up.gradeRating[1]
        ) {
          continue;
        }
        if (flags['Cadet'].up.mdtAndRadioRequired === true) {
          if (member.certificate.radio === false) {
            continue;
          }
          if (member.certificate.mdt === false) {
            continue;
          }
        }
        if (flags['Cadet'].up.sanctions === 'none') {
          if (member.sanctiuni.length > 0) {
            continue;
          }
          if (member.avertismente > 0) {
            continue;
          }
        }
        userIDList.push(member.IDDiscord);
      }

      if (member.grad === 'Agent') {
        if (
          diffInDays < flags['Agent'].up.requiredDays &&
          activityGrade !== 10
        ) {
          continue;
        }
        if (
          gradeRating !== flags['Agent'].up.gradeRating[0] &&
          gradeRating !== flags['Agent'].up.gradeRating[1]
        ) {
          continue;
        }
        if (flags['Agent'].up.mdtAndRadioRequired === true) {
          if (member.certificate.radio === false) {
            continue;
          }
          if (member.certificate.mdt === false) {
            continue;
          }
        }
        if (flags['Agent'].up.sanctions === 'none') {
          if (member.sanctiuni.length > 0) {
            continue;
          }
          if (member.avertismente > 0) {
            continue;
          }
        }
        userIDList.push(member.IDDiscord);
      }

      if (member.grad === 'Agent Principal') {
        if (
          diffInDays < flags['Agent Principal'].up.requiredDays &&
          activityGrade !== 10
        ) {
          continue;
        }
        if (
          gradeRating !== flags['Agent Principal'].up.gradeRating[0] &&
          gradeRating !== flags['Agent Principal'].up.gradeRating[1]
        ) {
          continue;
        }
        if (flags['Agent Principal'].up.mdtAndRadioRequired === true) {
          if (member.certificate.radio === false) {
            continue;
          }
          if (member.certificate.mdt === false) {
            continue;
          }
        }
        if (flags['Agent Principal'].up.sanctions === 'none') {
          if (member.sanctiuni.length > 0) {
            continue;
          }
          if (member.avertismente > 0) {
            continue;
          }
        }
        userIDList.push(member.IDDiscord);
      }
    }
  
    return {
      userIDList: userIDList
    }
  },
  async createOutList({ interaction, pulsar, utils, mongo, week }) {
    await pulsar.discordManager.embeds.createDefaultEmbed(`**(OUT)** Se creeaza lista pentru saptamana ${week}...`, {
      interaction: interaction,
      ephemeral: true,
      deferReply: true,
    });

    const members = await mongo.getAllMembers();
    let userIDList = [];

    for (const member of members) {
      await pulsar.discordManager.embeds.createDefaultEmbed(`**(OUT)** Se verifica activitatea pentru **${member.nume}** (${member.IDDiscord})`, {
        interaction: interaction,
        ephemeral: true,
        deferReply: true,
      });

      const [day, month, year] = await member.dataIntrare.split('.');
      const dataIntrareF = `${year}-${month}-${day}`;
      const dataIntrare = new Date(dataIntrareF);
      const dataCurenta = new Date();
      const diffInDays = await utils.dayConversion.getDifferenceInDays(
        dataIntrare,
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

      if(diffInDays < 7) {
        continue;
      }

      if(member.grad === 'Cadet'){
        if(gradeRating === flags['Cadet'].out.gradeRating) {
          userIDList.push(member.IDDiscord);
        }
      }

      if(member.grad === 'Agent'){
        if(gradeRating === flags['Agent'].out.gradeRating) {
          userIDList.push(member.IDDiscord);
        }
      }

      if(member.grad === 'Agent Principal'){
        if(gradeRating === flags['Agent Principal'].out.gradeRating) {
          userIDList.push(member.IDDiscord);
        }
      }
    }

    await pulsar.discordManager.embeds.createDefaultEmbed(`Listele au fost generate.`, {
      interaction: interaction,
      ephemeral: true,
      deferReply: true,
    });

    return {
      userIDList: userIDList
    }
  }
};
