import { db } from '../../handlers/mongoConnectionHandler';

export const createToken = async (token, userID, type, authorID) => {
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
};

export const deleteToken = async (token) => {
  await db.delete('Token', { id: token });
};

export const getToken = async (token) => {
  const result = await db.find('Token', { id: token });
  return result;
};
