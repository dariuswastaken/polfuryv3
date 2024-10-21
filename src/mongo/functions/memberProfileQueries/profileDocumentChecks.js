import { db } from '../../../handlers/mongoConnectionHandler.js';

export const hasCertificate = async (id, certificate) => {
    const result = await db.find('Member', {
        IDDiscord: id,
        [`certificate.${certificate}`]: true
    });
    return result;
};

export const hasFunc = async (id, func) => {
    const result = await db.find('Member', {
        IDDiscord: id
    });
    if (result.functii.includes(func)) return true;
    return false;
};
