import { db } from '../../../handlers/mongoConnectionHandler.js';

export const createMemberSnapshot = async (memberID, snapshotID) => {
    const member = await db.find('Member', { IDDiscord: memberID });
    await db.create('MemberSnapshot', {
        userData: member,
        IDDiscord: memberID,
        snapshotID: snapshotID,
        snapshotDate: new Date()
    });
};

export const getUserSnapshots = async (memberID) => {
    const result = await db.findMore('MemberSnapshot', { IDDiscord: memberID });
    return result;
};

export const getUserSnapshot = async (memberID, snapshotID) => {
    const result = await db.find('MemberSnapshot', {
        IDDiscord: memberID,
        snapshotID: snapshotID
    });
    return result;
};

export const loadMemberSnapshot = async (snapshotID, memberID) => {
    const result = await db.find('MemberSnapshot', { snapshotID: snapshotID });
    await db.update('Member', { IDDiscord: memberID }, { $set: result.userData });

    return result;
};

export const deleteMemberSnapshot = async (snapshotID) => {
    await db.delete('MemberSnapshot', { snapshotID: snapshotID });
};
