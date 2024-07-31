const { db } = require('../handlers/mongoConnectionHandler');
const {
  timeConversion,
  dayConversion
} = require('../utils/exports/utilsExports');

module.exports = {
  async createToken(token, userID, type, authorID) {
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

  async deleteToken(token) {
    await db.delete('Token', { id: token });
  },

  async getToken(token) {
    const result = await db.find('Token', { id: token });
    return result;
  },

  async createLog(type, id, data) {
    await db.create('Log', {
      tip_: type,
      id: id,
      data: data
    });
  },

  async getProfile(id) {
    const result = await db.find('Member', { IDDiscord: id });
    return result;
  },

  async getProfileByCallsign(callsign) {
    const result = await db.find('Member', { callsign: callsign });
    return result;
  },

  async createProfile(data) {
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
  },

  async deleteProfile(id) {
    const result = await db.delete('Member', { IDDiscord: id });
    return result;
  },

  async updateProfileCallsign(id, callsign) {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { callsign: callsign } }
    );
    return result;
  },

  async updateProfileRank(id, rank) {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { grad: rank } }
    );
    return result;
  },

  async updateProfileDate(id, newDate) {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { dataActualizare: newDate } }
    );
    return result;
  },

  async updateCertificate(id, certificate, status) {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $set: { [`certificate.${certificate}`]: status } }
    );
    return result;
  },

  async hasCertificate(id, certificate) {
    const result = await db.find('Member', {
      IDDiscord: id,
      [`certificate.${certificate}`]: true
    });
    return result;
  },

  async addFunc(id, func) {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $push: { functii: func } }
    );
    return result;
  },

  async removeFunc(id, func) {
    const result = await db.update(
      'Member',
      { IDDiscord: id },
      { $pull: { functii: func } }
    );
    return result;
  },

  async hasFunc(id, func) {
    const result = await db.find('Member', {
      IDDiscord: id
    });
    if (result.functii.includes(func)) return true;
    return false;
  },

  async getAllMembers() {
    const result = await db.getAllWSort('Member', { callsign: 1 });
    return result;
  },

  async getProfileAcademician(id) {
    const result = await db.find('Academician', { IDDiscord: id });
    return result;
  },

  async createProfileAcademician(data) {
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

  async setCooldownAcademie(data) {
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

  async deleteProfileAcademician(id) {
    const result = await db.delete('Academician', { IDDiscord: id });
    return result;
  },

  async getAcademicieni() {
    const result = await db.getAllWSort('Academician', { nume: 1 });
    return result;
  },

  async lastUpdate(id) {
    await db.update(
      'Update',
      { feature: id },
      {
        $set: {
          date: `${await dayConversion.getCurrentDate()}, ${await timeConversion.getCurrentTime()}`
        }
      }
    );
  },

  async updateActivity(
    discordID,
    serverID,
    { pontaj, rapoarte, amenzi, apeluri, lastLogin }
  ) {
    const currentWeek = await dayConversion.getCurrentWeek();
    const currentDate = new Date();
    const hasActivity = await db.find('ActivitateBeta', {
      IDDiscord: discordID,
      IDServer: parseInt(serverID),
      perioada: `${currentWeek[0]} - ${currentWeek[6]}`
    });

    if (!hasActivity) {
      await db.create('ActivitateBeta', {
        IDDiscord: discordID,
        IDServer: serverID,
        lastUpdate: currentDate,
        perioada: `${currentWeek[0]} - ${currentWeek[6]}`,
        data: {
          pontaj,
          rapoarte,
          amenzi,
          apeluri,
          lastLogin
        }
      });
    } else {
      await db.update(
        'ActivitateBeta',
        {
          IDDiscord: discordID,
          IDServer: serverID,
          perioada: `${currentWeek[0]} - ${currentWeek[6]}`
        },
        {
          $set: {
            lastUpdate: currentDate,
            data: {
              pontaj: pontaj,
              rapoarte: rapoarte,
              amenzi: amenzi,
              apeluri: apeluri,
              lastLogin: lastLogin
            }
          }
        }
      );
    }
  },

  async getActivity(discordID, week) {
    const result = await db.find('ActivitateBeta', {
      IDDiscord: discordID,
      perioada: week
    });
    return result;
  },

  async getAllActivity(discordID) {
    const result = await db.findMore('ActivitateBeta', {
      IDDiscord: discordID
    });
    return result;
  },

  async deleteActivityWeek(week) {
    await db.deleteBulk('ActivitateBeta', { perioada: week });
  },

  async getAllActivityWeeks() {
    const weekList = [];
    const result = await db.findMore('ActivitateBeta', {}, { perioada: 1 });

    for (let i = 0; i < result.length; i++) {
      if (!weekList.includes(result[i].perioada)) {
        weekList.push(result[i].perioada);
      }
    }
    return weekList;
  },

  async createLeave(discordID, days, type) {
    const currentWeek = await dayConversion.getCurrentWeek();

    const leave = await db.find('Concediu', {
      IDDiscord: discordID,
      perioada: `${currentWeek[0]} - ${currentWeek[6]}`
    });

    if (type === 'normal') {
      if (!leave) {
        await db.create('Concediu', {
          IDDiscord: discordID,
          perioada: `${currentWeek[0]} - ${currentWeek[6]}`,
          reason: '-',
          days: days
        });
      } else {
        await db.update(
          'Concediu',
          {
            IDDiscord: discordID,
            perioada: `${currentWeek[0]} - ${currentWeek[6]}`
          },
          { $set: { days: leave.days.concat(days) } }
        );
      }
    } else if (type === 'all') {
      await db.update(
        'Concediu',
        {
          IDDiscord: discordID,
          perioada: `${currentWeek[0]} - ${currentWeek[6]}`
        },
        { $set: { days: currentWeek } }
      );
    }
  },

  async updateLeaveReason(discordID, reason) {
    const currentWeek = await dayConversion.getCurrentWeek();

    await db.update(
      'Concediu',
      {
        IDDiscord: discordID,
        perioada: `${currentWeek[0]} - ${currentWeek[6]}`
      },
      { $set: { reason: reason } }
    );
  },

  async getLeave(discordID, period) {
    const result = await db.find('Concediu', {
      IDDiscord: discordID,
      perioada: period
    });
    return result;
  },

  async getAvailableCallsign(rank) {
    const result = await db.find('Callsign', { tip_: rank, taken: false });
    return result;
  },

  async updateCallsign(rank, id, status) {
    await db.update('Callsign', { tip_: rank, id: id }, { taken: status });
  },

  async createComponent({ tip_, componentDiscordID, componentID }) {
    await db.create('Component', {
      tip_: tip_,
      componentDiscordID: componentDiscordID,
      componentID: componentID,
      disabled: false
    });
  },

  async getComponent(id) {
    const result = await db.find('Component', { componentID: id });
    return result;
  },

  async disableComponent(id) {
    await db.update(
      'Component',
      { componentID: id },
      { $set: { disabled: true } }
    );
  },

  async createSanction({ authorID, sanctionID, sanctionedID }) {
    await db.create('PendingSanction', {
      authorID: authorID,
      sanctionID: sanctionID,
      sanctionedID: sanctionedID,
      pending: true,
      sanctions: null,
      reason: null,
      active: true,
      date: new Date()
    });
  },

  async updateSanctionList(sanctionID, sanctionList) {
    let sanction = await db.find('PendingSanction', {
      sanctionID: sanctionID
    });
    if (sanction.sanctions === null) {
      sanction.sanctions = [];
    }
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      { $set: { sanctions: sanction.sanctions.concat(sanctionList) } }
    );
  },

  async updateSanctionReason(sanctionID, reason) {
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      { $set: { reason: reason } }
    );
  },

  async closeSanctionList(sanctionID) {
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      { $set: { pending: false } }
    );
  },

  async closeSanction(sanctionID) {
    await db.update(
      'PendingSanction',
      { sanctionID: sanctionID },
      { $set: { active: false } }
    );
  },

  async getSanction(sanctionID) {
    const result = await db.find('PendingSanction', {
      sanctionID: sanctionID
    });
    return result;
  },

  async addSanctionsM(userID, sanctions) {
    const data = await db.find('Member', { IDDiscord: userID });
    await db.update(
      'Member',
      { IDDiscord: userID },
      { $set: { sanctiuni: data.sanctiuni.concat(sanctions) } }
    );
  },

  async addAvM(userID) {
    await db.add('Member', { IDDiscord: userID }, { avertismente: 1 });
  },

  async getTests(certificat) {
    const result = await db.findMore('Log', { tip_: 'adaugareCertificat' });
    let count = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i].data.certificat === certificat) {
        count++;
      }
    }
    return count;
  },

  async getRemoved(certificat) {
    const result = await db.findMore('Log', { tip_: 'stergereCertificat' });
    let count = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i].data.certificat === certificat) {
        count++;
      }
    }
    return count;
  },

  async getTestsApproved() {
    const result = await db.findMore('Log', { tip_: 'evidentaTest' });
    let count = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i].data.result === 'admitere') {
        count++;
      }
    }
    return count;
  },

  async getTestsRejected() {
    const result = await db.findMore('Log', { tip_: 'evidentaTest' });
    let count = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i].data.result === 'respingere') {
        count++;
      }
    }
    return count;
  },

  async getFuncActivity(userID, type) {
    if(type === 'tester') {
      const result = await db.findMore('Log', { tip_: 'evidentaTest', ['data.testerID']: userID });
      return result.length;
    } else {
      const result = await db.findMore('Log', { tip_: 'adaugareCertificat', ['data.authorID']: userID, ['data.certificat']: type });
      return result.length;
    }
  },

  async addCooldown(userID, tip_, days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    await db.create('Cooldown', {
      tip_: tip_,
      IDDiscord: userID,
      expiration: date
    });
  },

  async hasCooldown(userID, tip_) {
    const currentDate = new Date();
    const result = await db.find('Cooldown', {
      tip_: tip_,
      IDDiscord: userID
    });
    if (result === null) {
      return false;
    }
    const expirationDate = new Date(result.expiration);
    if (expirationDate.getTime() < currentDate.getTime()) {
      return false;
    }
    return true;
  },

  async getCooldowns(userID) {
    const result = await db.findMore('Cooldown', { IDDiscord: userID });
    return result;
  }
};
