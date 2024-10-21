import WebClient from '../client/webClient.js';

const webClient = new WebClient();

export const getUserMdtData = async (userId) => {
    const response = await webClient.get('/server/raportPolitie');
    return response.data.find((user) => user[0].startsWith(`[${userId}]`));
};

export const isOnDuty = async (userId) => {
    const response = await webClient.get('/server/raportPolitie');
    const data = await response.data.find((user) => user[0].startsWith(`[${userId}]`));
    if (data === undefined) return false;
    return data[9];
};

export const getUserServerProfile = async (userId) => {
    const response = await webClient.get(`/profile/${userId}`);
    return response.data;
};

export const resetMDT = async () => {
    await webClient.post('/raportPolitie/reset', {
        reset: true
    });
};
