"use strict";

const Base = require('./BaseChannel');


class VoiceChannel extends Base {
	constructor(channel, client){
		super(channel);
		this.name = channel.name;
	  	this.guild = client.guilds.get(channel.guild_id);
	}
}

module.exports = VoiceChannel;