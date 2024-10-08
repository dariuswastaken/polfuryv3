const { db } = require('../handlers/mongoConnectionHandler');

const countItems = (items, filter) => {
  return items.filter(filter).length;
}

module.exports = {
  createLog: async (type, id, data) => {
    await db.create('Log', {
      tip_: type,
      id: id,
      data: data
    });
  },
  
  getTests: async (certificat) => {
    const result = await db.findMore('Log', { tip_: 'adaugareCertificat' });
    return countItems(result, item => item.data.certificat === certificat);
  },

  getRemoved: async (certificat) => {
    const result = await db.findMore('Log', { tip_: 'stergereCertificat' });
    return countItems(result, item => item.data.certificat === certificat);
  },

  getTestsApproved: async () => {
    const result = await db.findMore('Log', { tip_: 'evidentaTest' });
    return countItems(result, item => item.data.result === 'admitere');
  },

  getTestsRejected: async () => {
    const result = await db.findMore('Log', { tip_: 'evidentaTest' });
    return countItems(result, item => item.data.result === 'respingere');
  },

  getFuncActivity: async (userID, type) => {
    let query = {}
    if (type === 'tester') {
      query = {
        tip_: 'evidentaTest',
        ['data.testerID']: userID
      }
    } else {
      query = {
        tip_: 'adaugareCertificat',
        ['data.authorID']: userID,
        ['data.certificat']: type,
      };
    }
    const result = await db.findMore('Log', query)
    return result.length;
  },
}