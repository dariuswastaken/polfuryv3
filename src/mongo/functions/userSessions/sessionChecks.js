import { db } from '../../../handlers/mongoConnectionHandler.js';

export const hasSession = async (schema, userID) => {
  const result = await db.find(schema, { userID: userID, active: true });
  if (result === null) {
    return false;
  }
};

export const getUserSessions = async (schema, userID) => {
  const result = await db.findMore(schema, { userID: userID });
  return result;
};
