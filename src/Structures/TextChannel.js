const { CHANNELS, CHANNEL_MESSAGES, CHANNEL } = require("../Rest/endpoints");
const { CHANNEL_TYPES } = require('../Constants');
const Base = require('./BaseChannel');
const MessageAttachment = require('./MessageAttachment');
const MessageEmbed = require('../utils/MessageEmbed');
const Message = require('./Message');
var FormData = require('form-data');

module.exports = class Channel extends Base {
  
  constructor(channel, client) {
    super(channel, client);
    this.name = channel.name;
    this.nsfw = channel.nsfw;
    this.guild = client.guilds.get(channel.guild_id);
  }

  /**
   * 
   * @param {{ embeds: Array<MessageEmbed> | null, content: String | null, tts: Boolean }} data 
   */
  send({ 
    embeds = [], 
    content = "", 
    tts = false,
    components = [] 
  }){

    //preformace checks you mother fucker :)
    let ms = Date().now;

    if((content == "" || content == null) && (embeds == null || embeds == []))
      throw new Error("Cannot send an empty message!");

    let data = new FormData();

    let json = {
      embeds: [],
      content: ""
    };

    if(embeds?.length){
      for(var i = 0; i < embeds.length; i++){
        if(embeds[i] instanceof MessageEmbed) {
          json.embeds.push(embeds[i]);
        }
      }
    }

    if(tts == false || tts == null)
    data.append("tts", "false");

    
    data.append("payload_json", JSON.stringify(json));

    console.log(`COMPLETED MESSAGE SEND FUNCTION IN ${ms - Date().now} MS`);

    this.client.rest.multipart_form_post({
      endpoint: CHANNEL_MESSAGES(this.id), 
      body: data,
      headers: data.getHeaders()
    }).then((res) => {
        res.guild_id = this.guild.id;
        console.log(`COMPLETED MESSAGE SEND REQUEST IN ${ms - Date().now} MS`);
        return new Message(res, this.client)
    }).catch((err) => {
        console.log(err.response.data);
    }); 

  }


  /**
   * @deprecated
   * @param {String | MessageEmbed} data 
   * @param  {...String | MessageEmbed | MessageAttachment} extras 
   * @returns The created Message
   */
  /* send(data, ...extras){
    if(data == "" && !data instanceof MessageEmbed) throw new Error("Cannot send an empty message!");

    let req_data = new FormData();

    let request_json = {
      embed: null,
      content: ""
    };

    //Check if we are sending an Embed
    if(data instanceof MessageEmbed) {
      request_json.embed = data.embed;
      req_data.append("tts", "false");
    } else {
      req_data.append("content", data);
      req_data.append("tts", "false");
    }

    // Determine the extra arguments passed into the function 
    for(var i in extras){
      if(typeof extras == "string") return;

      if(extras instanceof MessageAttachment) {

      } else if (extras instanceof MessageEmbed) {
        if(request_json.embed !== null) throw new Error("A message can only contain 1 message embed!");

        request_json.embed = i.embed;
      }

    }

    req_data.append("payload_json",JSON.stringify(request_json));

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
  **/
};

//wake up, wake up, wake up....