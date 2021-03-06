const axios = require("axios");

module.exports = class Request {
  constructor(client) {
    this.client = client;
  }

  make({ endpoint, method, options }) {
    return new Promise((resolve, reject) => {
      axios({
        method,
        url: options.data || null,
        headers: options.headers || {
          "Content-Type": "application/json",
          Authorization: `Bot ${this.client.token}`,
        },
      })
        .then((res) => resolve(res.data))
        .catch(reject);
    });
  }
};
