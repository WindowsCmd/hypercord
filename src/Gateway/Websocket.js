const { EventEmitter } = require("events");
const ws = require("ws");

module.exports = class Websocket extends EventEmitter {
  constructor(client) {
    super();
    this.client = client;
    this._ws = null;
    this._sessionId = null;
    this._heartbeat = null;
  }

  connect() {}
};
