import { db } from '../../handlers/mongoConnectionHandler.js';

export const createSanction = async ({ authorID, sanctionID, sanctionedID }) => {
    await db.create('PendingSanction', {
      authorID: authorID,
      sanctionID: sanctionID,
      sanctionedID: sanctionedID,
      pending: true,
      sanctions: null,
      reason: null,
      active: true,
      date: new Date(),
      scheduled: null
    });
  }

export const updateSanctionList = async (sanctionID, sanctionList, schedules) => {
    let sanction = await db.find('PendingSanction', {
      sanctionID: sanctionID
    });
    if (sanction.sanctions === null) {
      sanction.sanctions = [];
    }
    if (sanction.scheduled === null) {
      sanction.scheduled = [];
    }
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      {
        $set: {
          sanctions: sanction.sanctions.concat(sanctionList),
          scheduled: sanction.scheduled.concat(schedules)
        }
      }
    );
  }

export const updateSanctionReason = async (sanctionID, reason) => {
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      { $set: { reason: reason } }
    );
  }

export const closeSanctionList = async (sanctionID) => {
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      { $set: { pending: false } }
    );
  }

export const closeSanction = async (sanctionID) => {
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      { $set: { active: false } }
    );
  }

export const getSanction = async (sanctionID) => {
    const result = await db.find('PendingSanction', {
      sanctionID: sanctionID
    });
    return result;
  }

export const getAllSanctions = async () => {
    const result = await db.getAll('PendingSanction');
    return result;
  },
