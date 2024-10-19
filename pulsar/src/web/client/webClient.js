import axiosRetry from 'npm:axios-retry';
import axios from 'npm:axios';
import "jsr:@std/dotenv/load";

export default class WebClient {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://panel.furyrp.ro/api',
      timeout: 5000
    });

    axiosRetry(this.axiosInstance, {
      retries: 5,
      retryDelay: (retryCount) => {
        console.log(`[WEB] Retrying request...`);
        return retryCount * 1000;
      }
    });
  }

  async get(url) {
    try {
      const response = await this.axiosInstance.get(url, {
        headers: {
          'x-api-key': Deno.env.get('WEB_API_KEY')
        }
      });
      return response.data;
    } catch (error) {
      console.error('[WEB ERROR] Failed to fetch: ' + error);
    }
  }
};
