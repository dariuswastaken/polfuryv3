import { db } from '../../../handlers/mongoConnectionHandler.js';

export const getTop = async (week, type) => {
  const top = await db.findMoreWSort(
    'Activitate',
    { perioada: week },
    {
      [`data.${type}`]: 1
    }
  );
  return top.slice(0, 5);
};
