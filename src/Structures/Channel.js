const { CHANNELS, CHANNEL_MESSAGES, CHANNEL } = require("../Rest/endpoints");
const { CHANNEL_TYPES } = require('../Constants');


module.exports = class Channel {
  constructor(channel, client) {
    this.id = channel.id;
    this.type = CHANNEL_TYPES[channel.type] || channel.type;
    this.name = channel.name;
    this.nsfw = channel.nsfw;
    this.client = client;
  }

  send(data, attachments = null){
    if(data == "") throw new Error("Cannot send an empty message!");

    let req_data = {
      content: data,
      tts: false,
      embed: []
    }

    this.client.rest.make({
      endpoint: CHANNEL_MESSAGES(this.id), 
      method: "POST", 
      options: {data: JSON.stringify(req_data)}}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }
};
