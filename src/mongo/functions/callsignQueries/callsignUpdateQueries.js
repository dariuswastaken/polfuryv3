const { db } = require('../../../handlers/mongoConnectionHandler');
const { timeConversion, dayConversion } = require('../../utils/exports/globalExports');

module.exports = {
  getAvailableCallsign: async (rank) => {
    const result = await db.find('Callsign', { tip_: rank, taken: false });
    if(result.length === 0) return null;
    return result;
  },

  updateCallsign: async (rank, id, status) => {
    await db.update('Callsign', { tip_: rank, id: id }, { taken: status });
  },
}