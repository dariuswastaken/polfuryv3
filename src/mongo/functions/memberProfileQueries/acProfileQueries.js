const { db } = require('../handlers/mongoConnectionHandler');

module.exports = {
  getProfileAcademician: async (id) => {
    const result = await db.find('Academician', { IDDiscord: id });
    return result;
  },
  
  getAcademicieni: async () => {
    const result = await db.getAllWSort('Academician', { nume: 1 });
    return result;
  },
  
  createProfileAcademician: async (data) => {
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
  },

  deleteProfileAcademician: async (id) => {
    const result = await db.delete('Academician', { IDDiscord: id });
    return result;
  },
  
  setCooldownAcademie: async (data) => {
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
  },
}