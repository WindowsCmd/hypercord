module.exports = class Message {
    constructor(message, client) {
        this.id = message.id;
        this.content = message.content;
    }
}