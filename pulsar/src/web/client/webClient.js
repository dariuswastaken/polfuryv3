const axiosRetry = require('axios-retry').default;
const axios = require('axios');

module.exports = class WebClient {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://panel.furyrp.ro/api',
      timeout: 10000
    });

    axiosRetry(this.axiosInstance, {
      retries: 5,
      retryDelay: (retryCount) => {
        return retryCount * 1000;
      }
    });
  }

  async get(url) {
    try {
      const response = await this.axiosInstance.get(url, {
        headers: {
          'x-api-key': process.env.WEB_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('[WEB ERROR] Failed to fetch: ' + error);
    }
  }
};
