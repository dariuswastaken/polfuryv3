import { db } from '../../../handlers/mongoConnectionHandler.js';

module.exports = {
  getAllMembers: async () => {
    const result = await db.getAllWSort('Member', { callsign: 1 });
    return result;
  },
  
  wipeSanctions: async() => {
    await db.updateBulk('Member', {}, { 
      $set: {
        sanctiuni: [],
        avertismente: 0,
      }
    })
  }
}