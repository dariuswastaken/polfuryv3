import { db } from '../../../handlers/mongoConnectionHandler.js';

export const getTop = async (type) => {
  const top = await db.getAllWSort('Activitate', {
    [`${type}`]: 1
  });
  return top.slice(0, 5);
};
