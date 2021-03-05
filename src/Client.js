const Websocket = require("./Gateway/Websocket");
const { EventEmitter } = require("events");

module.exports = class Client extends EventEmitter {
  constructor(options = {}) {
    super();
    this.token = null;
    this.ws = new Websocket(this);

    this.ws.on("ready", (u) => {
      this.emit("ready", this);
    });
    this.ws.on("message", (m) => this.emit("message", m));
  }

  login(token) {
    this.token = token;
    this.ws.login();
  }
};
