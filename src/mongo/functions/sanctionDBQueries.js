const { db } = require('../../handlers/mongoConnectionHandler');

module.exports = {
  createSanction: async ({ authorID, sanctionID, sanctionedID }) => {
    await db.create('PendingSanction', {
      authorID: authorID,
      sanctionID: sanctionID,
      sanctionedID: sanctionedID,
      pending: true,
      sanctions: null,
      reason: null,
      active: true,
      date: new Date()
    });
  },

  updateSanctionList: async (sanctionID, sanctionList) => {
    let sanction = await db.find('PendingSanction', {
      sanctionID: sanctionID
    });
    if (sanction.sanctions === null) {
      sanction.sanctions = [];
    }
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      { $set: { sanctions: sanction.sanctions.concat(sanctionList) } }
    );
  },

  updateSanctionReason: async (sanctionID, reason) => {
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      { $set: { reason: reason } }
    );
  },

  closeSanctionList: async (sanctionID) => {
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      { $set: { pending: false } }
    );
  },

  closeSanction: async (sanctionID) => {
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      { $set: { active: false } }
    );
  },

  getSanction: async (sanctionID) => {
    const result = await db.find('PendingSanction', {
      sanctionID: sanctionID
    });
    return result;
  },
}