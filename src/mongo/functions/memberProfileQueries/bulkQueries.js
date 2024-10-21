import { db } from '../../../handlers/mongoConnectionHandler.js';

export const getAllMembers = async () => {
    const result = await db.getAllWSort('Member', { callsign: 1 });
    return result;
};

export const wipeSanctions = async () => {
    await db.updateBulk(
        'Member',
        {},
        {
            $set: {
                sanctiuni: [],
                avertismente: 0
            }
        }
    );
};
