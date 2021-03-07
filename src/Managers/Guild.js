const { CDN } = require("../Rest/endpoints");

module.exports = class Guild {
  constructor(guild) {
    this.icon = guild.icon;
    this.name = guild.name;
    this.features = guild.features;
    this.id = guild.id;
    this.members = new Map();
    this.channels = new Map();
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
