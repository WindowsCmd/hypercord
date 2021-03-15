const { CHANNELS, CHANNEL_MESSAGES, CHANNEL } = require("../Rest/endpoints");
const { CHANNEL_TYPES } = require('../Constants');
const MessageEmbed = require('../utils/MessageEmbed');


module.exports = class Channel {
  constructor(channel, client) {
    this.id = channel.id;
    this.type = CHANNEL_TYPES[channel.type] || channel.type;
    this.name = channel.name;
    this.nsfw = channel.nsfw;
    this.guild = client.guilds.get(channel.guild_id);
    this.client = client;
  }

  send(data, attachments = null){
    if(data == "" && !data instanceof MessageEmbed) throw new Error("Cannot send an empty message!");

    let req_data = {};

    if(data instanceof MessageEmbed) {
      req_data = {
        content: "",
        tts: false,
        embed: data.embed
      };
    } else {
      req_data = {
        content: data,
        tts: false,
        embed: []
      };
    }

    console.log(req_data);

    this.client.rest.make({
      endpoint: CHANNEL_MESSAGES(this.id), 
      method: "POST", 
      options: {data: JSON.stringify(req_data)}}).then((res) => {
        return new Message(res)
      }).catch((err) => {
       
      });
  }
};
