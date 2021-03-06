const Websocket = require("./Gateway/Websocket");
const Request = require("./Rest/Request");
const Constants = require("./Constants");
const FormData = require("form-data");
const { EventEmitter } = require("events");

module.exports = class Client extends EventEmitter {
  /**
   * @returns Client
   * @param {} options
   */
  constructor(options = {}) {
    super();
    this.token = null;
    this.ws = new Websocket(this);
    this.rest = new Request(this);
    this.intents = this.calcIntents(options.intents);
    this.ws.on("ready", (u) => {
      this.emit("ready", this);
    });
    this.ws.on("message", (m) => this.emit("message", m));
  }

  calcIntents(intents) {
    let final;
    if (!intents) {
      return 32767;
    } else {
      intents.forEach((intent) => {
        final = final * Constants.INTENTS[intent];
      });
    }
    return final;
  }

  send(channelId, data) {
    return new Promise((resolve, reject) => {
      if (!this.token) {
        reject(new Error("No Login details Provided!"));
      }
      if (!channelId) {
        reject(new Error("No channel ID provided when sending message."));
      }
      const form = new FormData();
    });
  }

  login(token) {
    this.token = token;
    this.ws.login();
  }
};
