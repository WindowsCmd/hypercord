const { CDN } = require("../Rest/endpoints");
const Channel = require("./Channel");
const Collection = require('../utils/Collection');

module.exports = class Guild {
  constructor(guild, client) {
    this.unavailable = guild.unavailable ? guild.unavailable : false; 
    this.icon = guild.icon || null;
    this.name = guild.name || null;
    this.features = guild.features || null;
    this.id = guild.id || null;
    this.members = new Map();
    this.client = client;
    this.channels = new Collection(Channel, this.client);

    //map all the channels
    if(guild.channels && guild.channels[0] && !this.unavailable){
      for(var channel of guild.channels){
        this.channels.add(channel)
      }
    }
  }

  /**
   *
   * @param {Icon Options} options
   */
  iconURL(options) {
    if (typeof options !== "object")
      throw new Error("options must be of type Object!");
    let format = options.format ? options.format : "webp";

    return `${CDN}/icons/${this.id}/${this.icon}.${format}${
      options?.size ? "?size=" + options.size : ""
    }`;
  }
};
