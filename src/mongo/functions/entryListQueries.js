import { db } from '../../handlers/mongoConnectionHandler.js';

export const createEntryList = async (tip, week, list) => {
  await db.create('EntryList', { tip_: tip, week: week, list: list });
};

export const getEntryList = async (tip, week) => {
  const result = await db.find('EntryList', { tip_: tip, week: week });
  return result;
};

export const deleteEntryList = async (tip, week) => {
  await db.delete('EntryList', { tip_: tip, week: week });
};
