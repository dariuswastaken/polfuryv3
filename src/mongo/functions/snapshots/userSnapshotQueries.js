const { db } = require('../../../handlers/mongoConnectionHandler');

module.exports = {
  createMemberSnapshot: async (memberID, snapshotID) => {
    const member = await db.find('Member', { IDDiscord: memberID });
    await db.create('MemberSnapshot', {
      userData: member,
      IDDiscord: memberID,
      snapshotID: snapshotID,
      snapshotDate: new Date()
    });
  },

  getUserSnapshots: async (memberID) => {
    const result = await db.findMore('MemberSnapshot', { IDDiscord: memberID });
    return result;
  },

  getUserSnapshot: async (memberID, snapshotID) => {
    const result = await db.find('MemberSnapshot', {
      IDDiscord: memberID,
      snapshotID: snapshotID
    });
    return result;
  },

  loadMemberSnapshot: async (snapshotID, memberID) => {
    const result = await db.find('MemberSnapshot', { snapshotID: snapshotID });
    await db.update(
      'Member',
      { IDDiscord: memberID },
      { $set: result.userData }
    );

    return result;
  },

  deleteMemberSnapshot: async (snapshotID) => {
    await db.delete('MemberSnapshot', { snapshotID: snapshotID });
  }
};
