const { CHANNELS, CHANNEL_MESSAGES, CHANNEL } = require("../Rest/endpoints");

module.exports = class Message {
    constructor(message, client) {
        this.id = message.id;
        this.client = client; 
        this.content = message.content;
        //If there is a message refrence (reply) the guild id will not be in the message it will be in the message_refrence 
        this.guild = this.client.guilds.get(message.guild_id || message?.message_reference?.guild_id) || null;
        this.channel = this.guild.channels.get(message.channel_id) || null;
        this.author = message.author;
        this.member = message.member;
        this.attachments = message.attachments;
        this.embeds = message.embeds;  
    }


    reply(data, attachments){
        if(data == "") throw new Error("Cannot send an empty message!");

        let req_data = {
          content: data,
          tts: false,
          embed: [],
          message_reference: {
              message_id: this.id,
              guild_id: this.guild.id
          }
        }

    
        this.client.rest.make({
          endpoint: CHANNEL_MESSAGES(this.channel.id), 
          method: "POST", 
          options: {data: JSON.stringify(req_data)}}).then((res) => {
            return new Message(res, this.client);
          }).catch((err) => {
            console.log(err);
          });
    }
}