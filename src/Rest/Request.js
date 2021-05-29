const axios = require("axios");
const {BASE} = require('./endpoints');

module.exports = class Request {
  constructor(client) {
    this.client = client;
  }

  make({ endpoint, method, options, content_type }) {
    return new Promise((resolve, reject) => {
      axios({
        method,
        url: BASE + endpoint || null,
        headers: options?.headers || {
          "Content-Type": content_type ? content_type : "application/json",
          Authorization: `Bot ${this.client.token}`
        },
        data: options.data
      })
        .then((res) => resolve(res.data))
        .catch(reject);
    });
  }


  multipart_form_post({endpoint, body, headers, content}) {
    return new Promise((resolve, reject) => {
      axios.post(BASE + endpoint || null, body, {
        headers: {
          ...headers,
          Authorization: `Bot ${this.client.token}`
        }
      }).then((res) => resolve(res.data)).catch(reject);
    });
  }
};
