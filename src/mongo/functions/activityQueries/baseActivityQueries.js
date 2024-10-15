import { db } from '../../../handlers/mongoConnectionHandler.js';
import { dayConversion } from '../../../utils/exports/globalExports.js';

export const updateActivity = async (discordID, serverID, { pontaj, rapoarte, amenzi, apeluri, lastLogin }) => {
  const currentWeek = await dayConversion.getCurrentWeek();
  const currentDate = new Date();
  const hasActivity = await db.find('Activitate', {
    IDDiscord: discordID,
    IDServer: parseInt(serverID),
    perioada: `${currentWeek[0]} - ${currentWeek[6]}`
  });

  if (!hasActivity) {
    await db.create('Activitate', {
      IDDiscord: discordID,
      IDServer: serverID,
      lastUpdate: currentDate,
      perioada: `${currentWeek[0]} - ${currentWeek[6]}`,
      data: {
        pontaj,
        rapoarte,
        amenzi,
        apeluri,
        lastLogin
      }
    });
  } else {
    await db.update(
      'Activitate',
      {
        IDDiscord: discordID,
        IDServer: serverID,
        perioada: `${currentWeek[0]} - ${currentWeek[6]}`
      },
      {
        $set: {
          lastUpdate: currentDate,
          data: {
            pontaj: pontaj,
            rapoarte: rapoarte,
            amenzi: amenzi,
            apeluri: apeluri,
            lastLogin: lastLogin
          }
        }
      }
    );
  }
};

export const getActivity = async (discordID, week) => {
  const result = await db.find('Activitate', {
    IDDiscord: discordID,
    perioada: week
  });
  return result;
};

export const getAllActivity = async (discordID) => {
  const result = await db.findMore('Activitate', {
    IDDiscord: discordID
  });
  return result;
};

export const deleteActivityWeek = async (week) => {
  await db.deleteBulk('Activitate', { perioada: week });
};

export const getAllActivityWeeks = async () => {
  const weekList = [];
  const result = await db.findMore('Activitate', {}, { perioada: 1 });

  for (let i = 0; i < result.length; i++) {
    if (!weekList.includes(result[i].perioada)) {
      weekList.push(result[i].perioada);
    }
  }
  return weekList;
};
