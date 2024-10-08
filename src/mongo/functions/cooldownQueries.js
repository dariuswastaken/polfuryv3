const { db } = require('../../handlers/mongoConnectionHandler');

module.exports = {
  addCooldown: async (userID, tip_, days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    await db.create('Cooldown', {
      tip_: tip_,
      IDDiscord: userID,
      expiration: date
    });
  },

  hasCooldown: async (userID, tip_) => {
    const currentDate = new Date();
    const result = await db.find('Cooldown', {
      tip_: tip_,
      IDDiscord: userID
    });
    if (result === null) {
      return false;
    }
    const expirationDate = new Date(result.expiration);
    if (expirationDate.getTime() < currentDate.getTime()) {
      return false;
    }
    return true;
  },

  getCooldowns: async (userID) => {
    const result = await db.findMore('Cooldown', { IDDiscord: userID });
    return result;
  },
}