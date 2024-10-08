const WebClient = require('../client/webClient');
const webClient = new WebClient();
const fs = require('fs')

module.exports = {
  getUserMdtData: async (userId) => {
    const response = await webClient.get('/server/raportPolitie');
    return response.data.find(user => user[0].startsWith(`[${userId}]`));
  },
  isOnDuty: async (userId) => {
    const response = await webClient.get('/server/raportPolitie');
    console.log(response);
    const data = await response.data.find(user => user[0].startsWith(`[${userId}]`));
    if(data === undefined) return false;
    return data[9];
  },
  getUserServerProfile: async (userId) => {
    const response = await webClient.get('/profile');
  },
  resetMDT: async () => {
    await webClient.post('/raportPolitie/reset', {
      reset: true
    });
  }
};
