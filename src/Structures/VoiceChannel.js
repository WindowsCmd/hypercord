"use strict";

const Base = require('./BaseChannel');
const { VOICE_STATE_UPDATE } = require('../Gateway/Payloads');


class VoiceChannel extends Base {
	constructor(channel, client){
		super(channel);
		this.name = channel.name;
	  	this.guild = client.guilds.get(channel.guild_id);
		this.bitrate = channel.bitrate;
		this.client = client;
		this.user_limit = channel.user_limit;
	}

	connect() {
		this.client.ws.WSSend(VOICE_STATE_UPDATE({guild_id: this.guild.id, channel_id: this.id}));
	}

	disconnect() {
		this.client.ws.WSSend(VOICE_STATE_UPDATE({guild_id: this.guild.id, channel_id: null}));
	}
}

module.exports = VoiceChannel;