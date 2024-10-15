import { db } from '../../../handlers/mongoConnectionHandler.js';

export const updateProfileName = async (id, name) => {
  const result = await db.update(
    'Member',
    { IDDiscord: id },
    { $set: { nume: name } }
  );
  return result;
};

export const updateProfileIDServer = async (id, serverID) => {
  const result = await db.update(
    'Member',
    { IDDiscord: id },
    { $set: { IDServer: serverID } }
  );

  await db.updateBulk(
    'Activitate',
    { IDDiscord: id },
    { $set: { IDDiscord: id, IDServer: serverID } }
  );
  return result;
};

export const updateProfileIDDiscord = async (id, discordID) => {
  const result = await db.update(
    'Member',
    { IDDiscord: id },
    { $set: { IDDiscord: discordID } }
  );

  await db.updateBulk(
    'Activitate',
    { IDDiscord: id },
    { $set: { IDDiscord: discordID } }
  );
  return result;
};

export const updateProfileEntryDate = async (id, entryDate) => {
  const result = await db.update(
    'Member',
    { IDDiscord: id },
    { $set: { dataIntrare: entryDate } }
  );
  return result;
};

export const updateProfileCallsign = async (id, callsign) => {
  const result = await db.update(
    'Member',
    { IDDiscord: id },
    { $set: { callsign: callsign } }
  );
  return result;
};

export const updateProfileRank = async (id, rank) => {
  const result = await db.update(
    'Member',
    { IDDiscord: id },
    { $set: { grad: rank } }
  );
  return result;
};

export const updateProfileDate = async (id, newDate) => {
  const result = await db.update(
    'Member',
    { IDDiscord: id },
    { $set: { dataActualizare: newDate } }
  );
  return result;
};

export const updateCertificate = async (id, certificate, status) => {
  const result = await db.update(
    'Member',
    { IDDiscord: id },
    { $set: { [`certificate.${certificate}`]: status } }
  );
  return result;
};

export const addFunc = async (id, func) => {
  const result = await db.update(
    'Member',
    { IDDiscord: id },
    { $push: { functii: func } }
  );
  return result;
};

export const removeFunc = async (id, func) => {
  const result = await db.update(
    'Member',
    { IDDiscord: id },
    { $pull: { functii: func } }
  );
  return result;
};

export const addSanctionsM = async (userID, sanctions) => {
  const data = await db.find('Member', { IDDiscord: userID });
  await db.update(
    'Member',
    { IDDiscord: userID },
    { $set: { sanctiuni: data.sanctiuni.concat(sanctions) } }
  );
};

export const addAvM = async (userID) => {
  await db.add('Member', { IDDiscord: userID }, { avertismente: 1 });
};

removeAvM = async (userID) => {
  await db.update(
    'Member',
    { IDDiscord: userID },
    { $inc: { avertismente: -1 } }
  );
};
