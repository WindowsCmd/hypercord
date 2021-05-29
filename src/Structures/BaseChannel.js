"use strict";
const { CHANNEL_TYPES } = require('../Constants');

class BaseChannel {
	constructor(data, client){
		this.id = data.id;
    	this.type = CHANNEL_TYPES[data.type] || data.type;
    	this.client = client;
	}


	static setType(data, client){
		switch(data.type){
			case 0:
				return new TextChannel(data, client);
			case 4: 
				return new GuildCategory(data, client);
			case 2:
				return new VoiceChannel(data, client);
			default:
				this.client.emit("Warning", "No dedicated channel interface for channel type " + data.type)
				return new BaseChannel(data, client);
		}
	}
}

module.exports = BaseChannel;

//heh, sneeky eh?
const TextChannel = require('./TextChannel');
const VoiceChannel = require('./VoiceChannel');
const GuildCategory = require('./GuildCategory');