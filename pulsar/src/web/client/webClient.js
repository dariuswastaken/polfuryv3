module.exports = class WebClient {
  constructor() {
    this.get = this.get.bind(this);
  }
  async get(url) {
    const options = {
      path: url,
      method: 'GET',
      host: 'panel.furyrp.ro',
      headers: {
        'x-api-key': process.env.WEB_API_KEY
      }
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
