import { db } from '../../../handlers/mongoConnectionHandler.js';

export const getProfileAcademician = async (id) => {
  const result = await db.find('Academician', { IDDiscord: id });
  return result;
};

export const getAcademicieni = async () => {
  const result = await db.getAllWSort('Academician', { nume: 1 });
  return result;
};

export const createProfileAcademician = async (data) => {
  const result = await db.create('Academician', {
    nume: data.nume,
    IDDiscord: data.IDDiscord,
    IDServer: data.IDServer,
    dataIntrare: data.dataIntrare,
    dataActualizare: data.dataActualizare,
    esuariTest: 0,
    cooldown: null,
    prezentaAcademie: false,
    suspendat: false
  });
  return result;
};

export const deleteProfileAcademician = async (id) => {
  const result = await db.delete('Academician', { IDDiscord: id });
  return result;
};

export const setCooldownAcademie = async (data) => {
  await db.update(
    'Academician',
    { IDDiscord: data.IDDiscord },
    { $set: { cooldown: data.cooldown } }
  );
  let result = await db.update(
    'Academician',
    { IDDiscord: data.IDDiscord },
    { $inc: { esuariTest: data.esuariTest } }
  );
  result = await db.find('Academician', { IDDiscord: data.IDDiscord });
  if (result.esuariTest >= 2) {
    return 'max reached';
  }
};
