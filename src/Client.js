const Websocket = require("./Gateway/Websocket");

module.exports = class Client {
  constructor(options = {}) {
    this.token = null;
    this.ws = new Websocket(this);
  }

  login(token) {
    this.token = token;
    this.ws.login();
  }
};
