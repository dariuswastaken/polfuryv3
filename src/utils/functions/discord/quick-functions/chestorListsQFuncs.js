import { flags } from '../../activity/flags.js';

module.exports = {
  createUpList: async ({ interaction, pulsar, utils, mongo, week }) => {
    await pulsar.discordManager.embeds.createDefaultEmbed(
      `**(UP)** Se creeaza lista pentru saptamana ${week}...`,
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );

    const members = await mongo.getAllMembers();
    let userIDList = [];
    for (let member of members) {
      await pulsar.discordManager.embeds.createDefaultEmbed(
        `**(UP)** Se verifica activitatea pentru **${member.nume}** (${member.IDDiscord})`,
        {
          interaction: interaction,
          ephemeral: true,
          deferReply: true
        }
      );

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
    };
  },
  
  createOutList: async ({ interaction, pulsar, utils, mongo, week }) => {
    await pulsar.discordManager.embeds.createDefaultEmbed(
      `**(OUT)** Se creeaza lista pentru saptamana ${week}...`,
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );

    const members = await mongo.getAllMembers();
    let userIDList = [];

    for (const member of members) {
      await pulsar.discordManager.embeds.createDefaultEmbed(
        `**(OUT)** Se verifica activitatea pentru **${member.nume}** (${member.IDDiscord})`,
        {
          interaction: interaction,
          ephemeral: true,
          deferReply: true
        }
      );

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

      if (diffInDays < 7) {
        continue;
      }

      if (member.grad === 'Cadet') {
        if (gradeRating === flags['Cadet'].out.gradeRating) {
          userIDList.push(member.IDDiscord);
        }
      }

      if (member.grad === 'Agent') {
        if (gradeRating === flags['Agent'].out.gradeRating) {
          userIDList.push(member.IDDiscord);
        }
      }

      if (member.grad === 'Agent Principal') {
        if (gradeRating === flags['Agent Principal'].out.gradeRating) {
          userIDList.push(member.IDDiscord);
        }
      }
    }

    await pulsar.discordManager.embeds.createDefaultEmbed(
      `Listele au fost generate.`,
      {
        interaction: interaction,
        ephemeral: true,
        deferReply: true
      }
    );

    return {
      userIDList: userIDList
    };
  }
};
