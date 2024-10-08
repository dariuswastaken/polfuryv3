const axiosRetry = require('axios-retry').default;
const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://panel.furyrp.ro/api',
  headers: {
    'x-api-key': process.env.WEB_API_KEY
  }
});

axiosRetry(axiosInstance, { retries: 3 });

module.exports = class WebClient {
  async get(url) {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('[WEB ERROR] Failed to fetch: ' + error);
    }
  }
  async post(url, payload) {
    const options = {
      path: url,
      method: 'POST',
      host: 'panel.furyrp.ro',
      headers: {
        'x-api-key': process.env.WEB_API_KEY
      },
      body: JSON.stringify(payload)
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.error('[WEB ERROR] Failed to fetch: ' + error);
    }
  }
};
