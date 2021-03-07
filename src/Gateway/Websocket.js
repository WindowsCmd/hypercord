const { EventEmitter } = require("events");
const ws = require("ws");
const Constants = require("../Constants");
const ZlibSync = require("zlib-sync");
const Payloads = require("./Payloads");

module.exports = class Websocket extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
    this._ws = null;
    this._sessionId = null;
    this.is_ready = false;
    this._heartbeat = null;
  }

  login() {
    this.connect();
  }

  connect() {
    this._ws = new ws(
      `${Constants.ENDPOINTS.GATEWAY}/?v=${Constants.GATEWAY_VERSION}&encoding=json`
    );

    this._ws.once("open", () => {
      if (this.ws !== null) {
        this.WSSend(
          Payloads.IDENTIFY({
            token: this.client.token,
            intents: this.client.intents,
          })
        );
      }
    });

    this._ws.once("close", this.handleClose.bind(this));
    this._ws.on("error", (m) => {
      console.log(m);
    });
    this._ws.on("message", this.handleMessage.bind(this));
  }

  handleClose(code, data) {
    if (this._ws !== null) {
      this.emit("reconnect", this.client);
      this.connect();
    }
  }

  WSSend(payload) {
    if (typeof payload === "string") {
      payload = JSON.parse(payload);
    }

    this._ws.send(JSON.stringify(payload));
  }

  handleMessage(data, flags) {
    const message = this.decompressGatewayMessage(data, flags);
    switch (message.op) {
      case Constants.GATEWAY_OP_CODES.DISPATCH:
        this._heartbeat = message.t;
        break;
      case Constants.GATEWAY_OP_CODES.HEARTBEAT:
        this.WSSend(Payloads.HEARTBEAT(this._heartbeat));
        break;

      case Constants.GATEWAY_OP_CODES.HELLO:
        if (this.client.presense !== null) {
          this.WSSend(Payloads.PRESENSE(this.client.presense));
        }

        this._heartbeat = message.d.heartbeat_interval;
        break;

      case Constants.GATEWAY_OP_CODES.INVALID_SESSION:
        if (this._sessionId !== null && this._heartbeat !== null) {
          this.WSSend(
            Payloads.RESUME({
              seq: this._heartbeat,
              session_id: this._sessionId,
              token: this.client.token,
            })
          );
        } else {
          this.WSSend(Payloads.IDENTIFY({ token: this.client.token }));
        }
        break;

      case Constants.GATEWAY_OP_CODES.PRESENCE_UPDATE:
        if (this.client.presense !== null) {
          this.WSSend(Payloads.PRESENSE(this.client.presense));
        }
        break;
    }

    switch (message.t) {
      case "READY":
        if (!this.is_ready) {
          this.emit("ready", message.d.user);
          this.is_ready = true;
          this._sessionId = message.d.session_id;
        }
        break;
      case "MESSAGE_CREATE":
        this.emit("message", message.d);
        break;
    }
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
