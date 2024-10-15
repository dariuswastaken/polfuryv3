import { db } from '../../../handlers/mongoConnectionHandler.js';

export const createProfile = async (data) => {
  await db.create('Member', {
    nume: data.nume,
    IDDiscord: data.IDDiscord,
    callsign: data.callsign,
    IDServer: data.IDServer,
    grad: data.grad,
    corp: data.corp,
    dataIntrare: data.dataIntrare,
    dataActualizare: data.dataIntrare,
    certificate: {
      radio: data.certificate.radio,
      moto: data.certificate.moto,
      pilot: data.certificate.pilot,
      highspeed: data.certificate.highspeed,
      mdt: data.certificate.mdt
    },
    functii: [],
    sanctiuni: [],
    avertismente: 0,
    notite: []
  });
};

export const deleteProfile = async (id) => {
  const result = await db.delete('Member', { IDDiscord: id });
  return result;
};

export const getProfile = async (id) => {
  const result = await db.find('Member', { IDDiscord: id });
  return result;
};

export const getProfileByCallsign = async (callsign) => {
  const result = await db.find('Member', { callsign: callsign });
  return result;
};
