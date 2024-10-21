import { db } from '../../../handlers/mongoConnectionHandler.js';

export const getTop = async (week, type) => {
    const top = await db.findMoreWSort(
        'Activitate',
        { perioada: week },
        {
            [`data.${type}`]: -1
        }
    );
    let filteredArray = [];
    for (let i = 0; i < top.length; i++) {
        const user = await db.find('Member', { IDDiscord: top[i].IDDiscord });
        if (user !== null) {
            filteredArray.push(top[i]);
        }
    }
    return filteredArray.slice(0, 5);
};
