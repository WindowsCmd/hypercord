const { EventEmitter } = require("events");
const ws = require("ws");
const Constants = require("../Constants");
const Payloads = require("./Payloads");

module.exports = class Websocket extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
    this._ws = null;
    this._sessionId = null;
    this._heartbeat = null;
  }

  connect() {
    this._ws = new ws(
      `${Constants.ENDPOINTS.GATEWAY}/?v=${Constants.GATEWAY_VERSION}&encoding=json`
    );

    this._ws.once("open", () => {
      if (this.ws !== null) {
        this.WSSend(Payloads.IDENTIFY({ token: this.client.token }));
      }
    });

    this._ws.once("close", () => {
      console.log("Closed");
    });

    this._ws.on("message");
  }

  WSSend(payload) {
    if (typeof payload === "string") {
      payload = JSON.parse(payload);
    }

    this._ws.send(JSON.stringify(payload));
  }
};
