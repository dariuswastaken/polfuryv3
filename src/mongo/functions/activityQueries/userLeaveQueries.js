import { db } from '../../../handlers/mongoConnectionHandler.js';
import * as dayConversion from '../../../utils/functions/base/dayConversion.js';

export const createLeave = async (discordID, days, type) => {
  const currentWeek = await dayConversion.getCurrentWeek();

  const leave = await db.find('Concediu', {
    IDDiscord: discordID,
    perioada: `${currentWeek[0]} - ${currentWeek[6]}`
  });

  if (type === 'normal') {
    if (!leave) {
      await db.create('Concediu', {
        IDDiscord: discordID,
        perioada: `${currentWeek[0]} - ${currentWeek[6]}`,
        reason: '-',
        days: days
      });
    } else {
      await db.update(
        'Concediu',
        {
          IDDiscord: discordID,
          perioada: `${currentWeek[0]} - ${currentWeek[6]}`
        },
        { $set: { days: leave.days.concat(days) } }
      );
    }
  } else if (type === 'all') {
    if (!leave) {
      await db.create('Concediu', {
        IDDiscord: discordID,
        perioada: `${currentWeek[0]} - ${currentWeek[6]}`,
        reason: '-',
        days: days
      });
    } else {
      await db.update(
        'Concediu',
        {
          IDDiscord: discordID,
          perioada: `${currentWeek[0]} - ${currentWeek[6]}`
        },
        { $set: { days: currentWeek } }
      );
    }
  }
};

export const updateLeaveReason = async (discordID, reason) => {
  const currentWeek = await dayConversion.getCurrentWeek();

  await db.update(
    'Concediu',
    {
      IDDiscord: discordID,
      perioada: `${currentWeek[0]} - ${currentWeek[6]}`
    },
    { $set: { reason: reason } }
  );
};

export const getLeave = async (discordID, period) => {
  const result = await db.find('Concediu', {
    IDDiscord: discordID,
    perioada: period
  });
  return result;
};
