const Websocket = require("./Gateway/Websocket");
const Request = require("./Rest/Request");
const Constants = require("./Constants");
const GuildManager = require("./Managers/Guild");
const Endpoints = require("./Rest/endpoints");
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
    this.user = null;
    this.ws = new Websocket(this);
    this.rest = new Request(this);
    this._guilds = new Map();
    this.intents = this.calcIntents(options.intents);
    this.ws.on("ready", (u) => {
      this.user = u;
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

  /**
   * Fetches guilds
   * @returns Map of guild objects
   */
  guilds() {
    return new Promise((resolve, reject) => {
      if (!this.user)
        throw new Error(
          "You must login to the gateway before fetching things!"
        );
      this.rest
        .make({
          endpoint: `${Endpoints.BASE}${Endpoints.GUILDS}`,
          method: "GET",
        })
        .then((res) => {
          res.forEach((guild) => {
            this._guilds.set(guild.id, new GuildManager(guild));
          });
        });
    });
  }

  login(token) {
    this.token = token;
    this.ws.login();
  }
};
