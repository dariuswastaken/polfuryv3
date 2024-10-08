const axiosRetry = require('axios-retry').default;
const axios = require('axios');

module.exports = class WebClient {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://panel.furyrp.ro/api',
      timeout: 10000
    });
    
    axiosRetry(this.axiosInstance, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay
    });
  }
  
  async get(url) {
    try {
      const response = await this.axiosInstance.get(url, {
        headers: {
          'x-api-key': process.env.WEB_API_KEY
        }
      });
      return response;
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
