module.exports = class Message {
    constructor(message, client) {
        this.id = message.id;
        this.client = client; 
        this.content = message.content;
        this.guild = this.client.guilds.get(this.id) || null;
        this.author = message.author;
        this.member = message.member;
        this.attachments = message.attachments;
        this.embeds = message.embeds;  
    }
}