const { OpusEncoder } = require('@discordjs/opus');

class AudioEncoder {
	
	constructor() {
		this.channel_size = 2;
		this.sample_rate = 48;

		this.encoder = new OpusEncoder(this.channel_size, this.sample_rate);
	}


	encodeOpus() {
		
	}


}

module.exports = AudioEncoder;