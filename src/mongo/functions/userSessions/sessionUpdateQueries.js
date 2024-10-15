import { db } from '../../../handlers/mongoConnectionHandler';

module.exports = {
  createSession: async (schema, { tip_, uniqueID, userID, data }) => {
    await db.create(schema, {
      tip_: tip_,
      uniqueID: uniqueID,
      userID: userID,
      active: true,
      data: data
    });
  },

  endSession: async (schema, uID) => {
    await db.update(
      schema,
      { uniqueID: uID },
      { $set: { 'data.dataClockOut': new Date(), active: false } }
    );
  }
};
