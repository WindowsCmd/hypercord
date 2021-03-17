const { CHANNELS, CHANNEL_MESSAGES, CHANNEL } = require("../Rest/endpoints");
const { CHANNEL_TYPES } = require('../Constants');
const MessageAttachment = require('./MessageAttachment');
const MessageEmbed = require('../utils/MessageEmbed');
const FormData = require('form-data');
const { from } = require("form-data");


module.exports = class Channel {
  constructor(channel, client) {
    this.id = channel.id;
    this.type = CHANNEL_TYPES[channel.type] || channel.type;
    this.name = channel.name;
    this.nsfw = channel.nsfw;
    this.guild = client.guilds.get(channel.guild_id);
    this.client = client;
  }

  send(data, attachment = null){
    if(data == "" && !data instanceof MessageEmbed) throw new Error("Cannot send an empty message!");
    
    if(!attachment || !attachment instanceof MessageAttachment) attachment = null;

    let req_data = new FormData();

    if(data instanceof MessageEmbed) {
      req_data.append("content", "");
      req_data.append("payload_json", JSON.stringify({
        embed: data.embed, 
        content: "", 
        tts: false
      }));
      if(attachment) req_data.append("file", attachment.buffer);
      req_data.append("tts", false);

    } else {
      req_data.append("content", data);
      if(attachment) req_data.append("file", attachment.buffer);
      req_data.append("tts", false);
    }



    this.client.rest.make({
      endpoint: CHANNEL_MESSAGES(this.id), 
      method: "POST", 
      options: {data: req_data}, 
      content_type: "multipart/form-data"}).then((res) => {
        return new Message(res)
      }).catch((err) => {
       console.log(err);
      }); 
  }
};
