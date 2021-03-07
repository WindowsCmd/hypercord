const { CHANNELS, CHANNEL_MESSAGES, CHANNEL } = require("../Rest/endpoints");

module.exports = class Channel {
  constructor(channel) {
    this.id = channel.id;
    this.type = channel.type;
    this.name = channel.name;
    this.nsfw = channel.nsfw;
  }
};
