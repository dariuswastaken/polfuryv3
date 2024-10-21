import { db } from '../../handlers/mongoConnectionHandler.js';

const countItems = (items, filter) => {
    return items.filter(filter).length;
};

export const createLog = async (type, id, data) => {
    await db.create('Log', {
        tip_: type,
        id: id,
        data: data
    });
};

export const getTests = async (certificat) => {
    const result = await db.findMore('Log', { tip_: 'adaugareCertificat' });
    return countItems(result, (item) => item.data.certificat === certificat);
};

export const getRemoved = async (certificat) => {
    const result = await db.findMore('Log', { tip_: 'stergereCertificat' });
    return countItems(result, (item) => item.data.certificat === certificat);
};

export const getTestsApproved = async () => {
    const result = await db.findMore('Log', { tip_: 'evidentaTest' });
    return countItems(result, (item) => item.data.result === 'admitere');
};

export const getTestsRejected = async () => {
    const result = await db.findMore('Log', { tip_: 'evidentaTest' });
    return countItems(result, (item) => item.data.result === 'respingere');
};

export const getFuncActivity = async (userID, type) => {
    let query = {};
    if (type === 'tester') {
        query = {
            tip_: 'evidentaTest',
            ['data.testerID']: userID
        };
    } else {
        query = {
            tip_: 'adaugareCertificat',
            ['data.authorID']: userID,
            ['data.certificat']: type
        };
    }
    const result = await db.findMore('Log', query);
    return result.length;
};
