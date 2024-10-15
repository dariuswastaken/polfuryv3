import { db } from '../../handlers/mongoConnectionHandler';

module.exports = {
  createToken: async (token, userID, type, authorID) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await db.create('Token', {
      IDDiscord: userID,
      id: token,
      type: type,
      expiresAt: expiryDate,
      createdAt: new Date(),
      author: authorID
    });
  },

  deleteToken: async (token) => {
    await db.delete('Token', { id: token });
  },

  getToken: async (token) => {
    const result = await db.find('Token', { id: token });
    return result;
  },
}