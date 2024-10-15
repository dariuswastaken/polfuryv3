import { db } from '../../../handlers/mongoConnectionHandler.js';

module.exports = {
  hasCertificate: async (id, certificate) => {
    const result = await db.find('Member', {
      IDDiscord: id,
      [`certificate.${certificate}`]: true
    });
    return result;
  },
  
  hasFunc: async (id, func) => {
    const result = await db.find('Member', {
      IDDiscord: id
    });
    if (result.functii.includes(func)) return true;
    return false;
  },
}