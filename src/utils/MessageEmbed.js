module.exports = class HyperEmbed {

    constructor(){
        this.embed = {
            title: null,
            description: null,
            type: "rich",
            url: null,
            timestamp: null,
            color: null,
            footer: null,
            image: null,
            thumbnail: null,
            video: null,
            provider: null,
            author: null,
            fields: []
        }
    }

     /**
      * Sets the embed title
      * @param {String} title
      * @returns {MessageEmbed} Message Embed Object 
      */
    setTitle(title){
        if(typeof title !== "string") throw new Error("Title must be of type string not " + typeof title);
        this.embed.title = title;
        return this;
    } 

    /**
     * 
     * @param {String} description The embed description 
     * @returns {MessageEmbed} Message Embed Object
     */
    setDescription(description){
        if(typeof description !== "string") throw new Error("Description must be of type string not "+ typeof description);
        if(description.length > 2048) throw new Error("Description must be shorter than 2048 chars");
        this.embed.description = description;
        return this;         
    }

    /**
     * 
     * @param {String} title Title of the field
     * @param {String} value Contents of the field
     * @param {Boolean} inline If the field is inline or not
     * @returns {MessageEmbed} Message Embed Object  
     */
    addField(title, value, inline=false){
        if(typeof title !== "string") throw new Error("Field title must be of type string not " + typeof title);
        if(typeof value !== "string") throw new Error("Field title must be of type string not " + typeof content);
        if(typeof inline !== "boolean") inline = false;

        let field = {
            name: title,
            value: value,
            inline: inline
        };

        this.embed.fields.push(field);
        return this;
    }
    
    /**
     * Sets the author of the embed
     * @param {Object} author The author of the message
     * @returns {MessageEmbed} Message Embed Object 
    */
    setAuthor(author){
        this.embed.author = {
            name: author.name || null,
            url: author.url || null,
            icon_url: author.icon || null,
            proxy_icon_url: author.proxy_icon || null
        };
        return this;
    }

    /**
     * Sets the color of the embed
     * @param {String} color Color in hex
     * @returns {MessageEmbed} Message Embed Object
     */
    setColor(color){
        if(typeof color !== "string") throw new Error("Embed color must be of type string not " + typeof color);
        this.embed.color = color;
        return this;
    }


    /**
     * 
     * @param {Object} footer The footer object
     * @returns {MessageEmbed} Message Embed Object
     */
    setFooter(footer){
        if(!footer.text) throw new Error("Footer must have text property!");

        this.embed.footer = {
            text: footer.text || null,
            icon_url: footer.icon_url || null,
        }

        return this;
    }

    /**
     * 
     * @param {String} url A well formed url
     * @returns {MessageEmbed} Message Embed Object
     */
    setURL(url){
        if(typeof url !== "string") throw new Error("Type of url must be string not " + typeof url);
        this.embed.url = url;
        return this;
    }

    /**
     * Adds the timestamp
     * @returns {MessageEmbed} Message Embed Object
     */
    addTimestamp() {
        let date = new Date().toISOString();
        this.embed.timestamp = date;
        return this;
    }

    /**
     * Exports the embed as a string in json format
     * @returns {String} Embed as json format in string
     */
    toString(){
        return JSON.stringify(this.embed);
    }
}