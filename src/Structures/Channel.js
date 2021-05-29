const { CHANNELS, CHANNEL_MESSAGES, CHANNEL } = require("../Rest/endpoints");
const { CHANNEL_TYPES } = require('../Constants');
const MessageAttachment = require('./MessageAttachment');
const MessageEmbed = require('../utils/MessageEmbed');
const Message = require('./Message');
var FormData = require('form-data');

module.exports = class Channel {
  constructor(channel, client, parent_id) {
    this.id = channel.id;
    this.type = CHANNEL_TYPES[channel.type] || channel.type;
    this.name = channel.name;
    this.nsfw = channel.nsfw;
    this.guild = client.guilds.get(parent_id);
    this.client = client;
  }

  send(data, attachment = null){

    if(data == "" && !data instanceof MessageEmbed) throw new Error("Cannot send an empty message!");
    
    if(!attachment || !attachment instanceof MessageAttachment) attachment = null;

    let req_data = new FormData();

    if(data instanceof MessageEmbed) {
    
      req_data.append("payload_json",JSON.stringify({
        embed: data.embed,
        content: ""
      }));


      if(attachment) req_data.append("file", attachment.buffer);
      req_data.append("tts", "false");

    } else {
      req_data.append("content", data);
      if(attachment) req_data.append("file", attachment.buffer);
      req_data.append("tts", "false");
    }

    this.client.rest.multipart_form_post({
      endpoint: CHANNEL_MESSAGES(this.id), 
      body: req_data,
      headers: req_data.getHeaders()
    }).then((res) => {
      res.guild_id = this.guild.id;
      return new Message(res, this.client)
    }).catch((err) => {
     console.log(err.response.data);
     
    }); 
    
  }
};
