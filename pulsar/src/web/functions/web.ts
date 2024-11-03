import WebClient from '../client/webClient.ts';

const webClient = new WebClient();

export const getUserMdtData = async (userId: number): Promise<any[] | undefined | boolean> => {
    const response = await webClient.get('/server/raportPolitie');
    return response.data.find((user: any[]) => user[0].startsWith(`[${userId}]`));
};

export const isOnDuty = async (userId: number): Promise<any[] | undefined | boolean> => {
    const response = await webClient.get('/server/raportPolitie');
    const data = await response.data.find((user: any[]) => user[0].startsWith(`[${userId}]`));
    if (data === undefined) return false;
    return data[9];
};

export const getUserServerProfile = async (
    userId: number
): Promise<any[] | undefined | boolean> => {
    const response = await webClient.get(`/profile/${userId}`);
    return response.data;
};
