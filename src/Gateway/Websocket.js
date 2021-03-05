const { EventEmitter } = require("events");
const ws = require("ws");
const Constants = require("../Constants");
const ZlibSync = require("zlib-sync");
const Payloads = require("./Payloads");
const { inflateSync } = require("node:zlib");

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

    this._ws.on("message", this.handleMessage.bind(this));
  }

  WSSend(payload) {
    if (typeof payload === "string") {
      payload = JSON.parse(payload);
    }

    this._ws.send(JSON.stringify(payload));
  }

  handleMessage(data, flags) {
    const message = this.decompressGatewayMessage(data, flags);
  }

  decompressGatewayMessage(message, flags) {
    if (typeof flags !== "object") {
      flags = {};
    }
    if (!flags.binary) {
      return JSON.parse(message);
    } else {
      const inflate = new ZlibSync.Inflate();
      inflate.push(message, ZlibSync.Z_SYNC_FLUSH);

      if (inflate.err < 0) {
        throw new Error("Zlib error has occured " + inflate.msg);
      }
      return JSON.parse(inflate.toString());
    }
  }
};
