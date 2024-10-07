module.exports = {
  sendUpList: async ({ pulsar, interaction, utils, mongo, week }) => {
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
  
  sendOutList: async ({ pulsar, interaction, utils, mongo, week }) => {
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
