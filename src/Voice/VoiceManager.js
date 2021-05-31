const Collection = require('../utils/Collection');
const VoiceDispatcher = require('./VoiceDispatcher');
const {} = require('../Gateway/Payloads');

class VoiceManager extends Collection {

	constructor(client) {
		super();
		this.client = client;
		this.channel_size = 2;
		this.sample_rate = 48;
	}


	Connect(guild_id, token, endpoint){
		
		console.log(token);
		if(this.get(guild_id)) this.get(guild_id).dispatcher.terminate();

		const dispatcher = new VoiceDispatcher(this.client, guild_id, endpoint, token);

		dispatcher.Initalize();

	}
	
}

module.exports = VoiceManager;