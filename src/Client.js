const Websocket = require("./Gateway/Websocket");
const Request = require("./Rest/Request");
const Constants = require("./Constants");
const GuildManager = require("./Structures/Guild");
const Guild = require('./Structures/Guild');
const Collection = require('./utils/Collection');
const Endpoints = require("./Rest/endpoints");
const Payloads = require("./Gateway/Payloads");
const FormData = require("form-data");
const Message = require("./Structures/Message");
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
    this.startTime = new Date().now;
    this.ws = new Websocket(this);
    this.rest = new Request(this);
    this.guilds = new Collection(Guild, this);
    this.presense = null;
    this.intents = this.calcIntents(options.intents);
    this.ws.on("ready", async (u) => {
      this.user = u;
      this.emit("ready", this);
    });
    this.ws.on("guild_create", (g) => this.emit("guild_create", g));
    this.ws.on("message", (m) => this.emit("message", new Message(m, this)));
  }

  /**
   * Gets the uptime of the node process
   * @returns {Date} Uptime of node process
   */
  uptime() {
    return this.startTime - new Date.now();
  }

  /**
   *
   * @param {Object} presence_object
   * @returns {Presence_object} Presence object
   */
  setPresence({ status, game, client_status }) {
    if (typeof game !== "object") game = null;
    if (typeof client_status !== "string") client_status = null;

    if (typeof game?.type == "string") {
      switch (game.type) {
        case "PLAYING":
          game.type = 0;
          break;
        case "STREAMING":
          game.type = 1;
          break;
        case "LISTENING":
          game.type = 2;
          break;
        case "CUSTOM":
          game.type = 4;
          break;
        case "COMPETING":
          game.type = 5;
          break;
        default:
          game.type = 0;
          break;
      }
    }

    this.presense = {
      status: status || this.presense.status,
      game: game || null,
      client_status: client_status || this.presense.client_status,
    };

    return this;
  }

  /**
   * Calculates the bots intents
   * @param Array Array of intents
   * @returns {Number} Calculation of indents provided if none, defaults to all.
   */
  calcIntents(intents) {
    let final;
    if (!intents) {
      return 513;
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
  fetchGuilds() {
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
            this.guilds.set(guild.id, new GuildManager(guild));
          });
          resolve(this.guilds);
        })
        .catch((e) => reject(e));
    });
  }

  /**
   * Logges in the bot to the discord gateway 
   * @param {Bot Token} token 
   */
  login(token) {
    this.token = token;
    this.ws.login();
  }
};
