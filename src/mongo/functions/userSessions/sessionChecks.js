import { db } from '../../../handlers/mongoConnectionHandler';

module.exports = {
  hasSession: async (schema, userID) => {
    const result = await db.find(schema, { userID: userID, active: true });
    if (result === null) {
      return false;
    }
  },

  getUserSessions: async (schema, userID) => {
    const result = await db.findMore(schema, { userID: userID });
    return result;
  },
}