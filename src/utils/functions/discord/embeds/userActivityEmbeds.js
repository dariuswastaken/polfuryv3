export const sendUserActivityEmbed = async ({
    pulsar,
    interaction,
    mongo,
    targetID,
    utils,
    week
}) => {
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

    let activityGrade = await utils.algorithms.gradeAlgorithm(targetProfile.grad, {
        activity: userActivity.data.pontaj,
        reports: userActivity.data.rapoarte,
        fines: userActivity.data.amenzi,
        calls: userActivity.data.apeluri,
        actions: actions,
        leaveDays: concediu.days.length
    });
    let activityNotes = await utils.activity.utils.createNotices(targetProfile.grad, {
        pontaj: userActivity.data.pontaj,
        rapoarte: userActivity.data.rapoarte,
        amenzi: userActivity.data.amenzi,
        apeluri: userActivity.data.apeluri,
        actiuni: actions
    });
    let gradeRating = await utils.activity.utils.gradeRating(activityGrade, concediu.days.length);

    let actionsFmt = '';
    if (targetProfile.grad === 'Cadet' || targetProfile.grad === 'Agent') {
        actionsFmt = `${actions} (Participare)`;
    } else {
        actionsFmt = `${actions} (Organizare)`;
    }

    const [rankUpDay, rankUpMonth, rankUpYear] = targetProfile.dataActualizare.split('.');
    const [lastWeekDay, lastWeekMonth, lastWeekYear] = date2.split('.');

    const formattedRankupDateISO = `${rankUpYear}-${rankUpMonth}-${rankUpDay}`;
    const formattedLastWeekDateISO = `${lastWeekYear}-${lastWeekMonth}-${lastWeekDay}`;

    const rankUpDate = new Date(formattedRankupDateISO);
    const lastWeekDate = new Date(formattedLastWeekDateISO);

    const daysFromLastRankUp = await utils.dayConversion.getDifferenceInDays(
        rankUpDate,
        lastWeekDate
    );

    if (userActivity.data.lastLogin === 'Online') {
        userActivity.data.lastLogin = `Online pe data de \n${
            lastUpdateFormatted.split(', ')[0]
        }, ora ${lastUpdateFormatted.split(', ')[1]}`;
    }

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
};
