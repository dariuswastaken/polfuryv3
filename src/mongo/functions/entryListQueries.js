const { db } = require('../../handlers/mongoConnectionHandler');

module.exports = {
  createEntryList: async (tip, week, list) => {
    await db.create('EntryList', { tip_: tip, week: week, list: list });
  },

  getEntryList: async (tip, week) => {
    const result = await db.find('EntryList', { tip_: tip, week: week });
    return result;
  },

  deleteEntryList: async (tip, week) => {
    await db.delete('EntryList', { tip_: tip, week: week });
  },
}