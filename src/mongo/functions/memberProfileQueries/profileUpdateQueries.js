const { db } = require('../../../handlers/mongoConnectionHandler');

module.exports = {
  updateProfileName: async (id, name) => {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { nume: name } }
    );
    return result;
  },

  updateProfileIDServer: async (id, serverID) => {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { IDServer: serverID } }
    );

    await db.updateBulk('Activitate', 
      { IDDiscord: id }, 
      { $set: { IDDiscord: id, IDServer: serverID } }
    )
    return result;
  },

  updateProfileIDDiscord: async (id, discordID) => {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { IDDiscord: discordID } }
    );

    await db.updateBulk('Activitate',
      { IDDiscord: id },
      { $set: { IDDiscord: discordID } }
    );
    return result;
  },

  updateProfileEntryDate: async (id, entryDate) => {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { dataIntrare: entryDate } }
    );
    return result;
  },

  updateProfileCallsign: async (id, callsign) => {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { callsign: callsign } }
    );
    return result;
  },

  updateProfileRank: async (id, rank) => {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { grad: rank } }
    );
    return result;
  },

  updateProfileDate: async (id, newDate) => {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { dataActualizare: newDate } }
    );
    return result;
  },

  updateCertificate: async (id, certificate, status) => {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { [`certificate.${certificate}`]: status } }
    );
    return result;
  },
  
  addFunc: async (id, func) => {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $push: { functii: func } }
    );
    return result;
  },
  
  removeFunc: async (id, func) => {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $pull: { functii: func } }
    );
    return result;
  },
  
  addSanctionsM: async (userID, sanctions) => {
    const data = await db.find('Member', { IDDiscord: userID });
    await db.update(
      'Member',
      { IDDiscord: userID },
      { $set: { sanctiuni: data.sanctiuni.concat(sanctions) } }
    );
  },
  
  addAvM: async (userID) => {
    await db.add('Member', { IDDiscord: userID }, { avertismente: 1 });
  },
}