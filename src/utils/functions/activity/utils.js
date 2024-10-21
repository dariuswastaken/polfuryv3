import { flags } from './flags.js';

export const createNotices = async (rank, { pontaj, rapoarte, amenzi, apeluri, actiuni }) => {
    let noticeList = [];
    switch (rank) {
        case 'Cadet':
            if (pontaj < 900) {
                noticeList.push('- Mareste activitatea');
            }
            if (rapoarte < 7) {
                noticeList.push('- Mareste numarul de rapoarte create');
            }
            if (amenzi < 5) {
                noticeList.push('- Mareste numarul de amenzi acordate');
            }
            if (apeluri < 4) {
                noticeList.push('- Mareste numarul de apeluri preluate');
            }
            if (actiuni < 3) {
                noticeList.push('- Participa la mai multe actiuni (Razii Licente/Rutiere)');
            }
            break;
        case 'Agent':
            if (pontaj < 900) {
                noticeList.push('- Mareste activitatea');
            }
            if (rapoarte < 4) {
                noticeList.push('- Mareste numarul de rapoarte create');
            }
            if (amenzi < 7) {
                noticeList.push('- Mareste numarul de amenzi acordate');
            }
            if (apeluri < 5) {
                noticeList.push('- Mareste numarul de apeluri preluate');
            }
            if (actiuni < 2) {
                noticeList.push('- Participa la mai multe actiuni (Razii Licente/Rutiere)');
            }
            break;
        case 'Agent Principal':
            if (pontaj < 840) {
                noticeList.push('- Mareste activitatea');
            }
            if (rapoarte < 2) {
                noticeList.push('- Mareste numarul de rapoarte create');
            }
            if (amenzi < 6) {
                noticeList.push('- Mareste numarul de amenzi acordate');
            }
            if (apeluri < 3) {
                noticeList.push('- Mareste numarul de apeluri preluate');
            }
            if (actiuni < 1) {
                noticeList.push('- Mareste numarul de actiuni organizate (Razii Licente/Rutiere)');
            }
            break;
        default:
            if (pontaj < 840) {
                noticeList.push('- Mareste activitatea');
            }
            if (rapoarte < 1) {
                noticeList.push('- Mareste numarul de rapoarte create');
            }
            if (amenzi < 4) {
                noticeList.push('- Mareste numarul de amenzi acordate');
            }
            if (apeluri < 2) {
                noticeList.push('- Mareste numarul de apeluri preluate');
            }
            if (actiuni < 2) {
                noticeList.push('- Mareste numarul de actiuni organizate (Razii Licente/Rutiere)');
            }
            break;
    }
    if (noticeList.length === 0) {
        noticeList.push('- Nici o notita');
    }
    return noticeList;
};

export const getActionActivity = async (period, id, rank, client) => {
    try {
        const startDateStr = period.split(' - ')[0];
        const endDateStr = period.split(' - ')[1];

        const [startDay, startMonth, startYear] = startDateStr.split('.');
        const [endDay, endMonth, endYear] = endDateStr.split('.');

        const startDate = new Date(`${startYear}-${startMonth}-${startDay}T00:00:00.000Z`);
        const endDate = new Date(`${endYear}-${endMonth}-${endDay}T22:00:00.000Z`);

        const licenteChannel = client.channels.cache.get('1094603342824607824');
        const rutiereChannel = client.channels.cache.get('1094603344032583687');

        const [messagesLicente, messagesRutiere] = await Promise.all([
            licenteChannel.messages.fetch({ limit: 100 }),
            rutiereChannel.messages.fetch({ limit: 100 })
        ]);

        let mentions = {
            licente: 0,
            rutiere: 0
        };
        let organizate = {
            licente: 0,
            rutiere: 0
        }

        const filterByIDandDate = (msg) => {
            return (
                msg.mentions.has(id) &&
                msg.createdTimestamp >= startDate &&
                msg.createdTimestamp <= endDate
            );
        };

        if (rank === 'Cadet' || rank === 'Agent') {
            const mentionsLicente = messagesLicente.filter(filterByIDandDate);
            const mentionsRutiere = messagesRutiere.filter(filterByIDandDate);

            mentionsLicente.forEach(async (msg) => {
                if (msg.content.includes(`<@${id}>`)) {
                    mentions.licente++;
                } else {
                    mentions.licente = mentions.licente;
                }
            });

            mentionsRutiere.forEach(async (msg) => {
                if (msg.content.includes(`<@${id}>`)) {
                    mentions.rutiere++;
                } else {
                    mentions.rutiere = mentions.rutiere;
                }
            });

            return mentions;
        } else {
            const organizateLicente = messagesLicente.filter(filterByIDandDate);
            const organizateRutiere = messagesRutiere.filter(filterByIDandDate);

            organizateLicente.forEach(async (msg) => {
                if (msg.author.id === id) {
                    organizate.licente++;
                } else {
                    organizate.licente = organizate.licente;
                }
            });

            organizateRutiere.forEach(async (msg) => {
                if (msg.author.id === id) {
                    organizate.rutiere++;
                } else {
                    organizate.rutiere = organizate.rutiere;
                }
            });

            return organizate;
        }
    } catch (error) {
        console.log(error);
    }
};

export const gradeRating = async (grade, leaveDays) => {
    let rating = '';
    if (leaveDays >= 5) {
        return 'CONCEDIU';
    }
    if (grade <= 2.5) {
        rating = 'F';
    } else if (grade <= 5.49 && grade > 2.5) {
        rating = 'D';
    } else if (grade >= 5.5 && grade < 8) {
        rating = 'C';
    } else if (grade >= 8 && grade < 9.25) {
        rating = 'B';
    } else if (grade >= 9.25) {
        rating = 'A';
    }
    return rating;
};
