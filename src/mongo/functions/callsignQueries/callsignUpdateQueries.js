import { db } from '../../../handlers/mongoConnectionHandler.js';

export const getAvailableCallsign = async (rank) => {
  const result = await db.find('Callsign', { tip_: rank, taken: false });
  if (result.length === 0) return null;
  return result;
};

export const updateCallsign = async (rank, id, status) => {
  await db.update('Callsign', { tip_: rank, id: id }, { taken: status });
};
