const WS = require('ws');
const Payloads = require('./Payloads');
const udp = require('dgram');
const { VOICE_OP_CODES } = require('../Constants.js');

class VoiceDispatcher {

	constructor(client, guild_id, endpoint, token){
		this.client = client;
		this.guild = client.guilds.get(guild_id);
		this.endpoint = endpoint;
		this.token = token;

		this.heartbeat = null;
		this.ws = null;

		this.ENC_TYPE = "xsalsa20_poly1305";
		this.modes = null;
		this.udp_endpoint = null;
		this.udp_port = null;
		this.udp_client;
		this.nonce = Buffer.alloc(24);
	}


	Initalize() {
		this.ws = new WS(`wss://${this.endpoint}`);

		this.ws.once('open', () => {
			if(this.ws !== null) {
				this.WSSend(Payloads.Identify({
					user_id: this.client.user.id, 
					token: this.token,
					session_id: this.client.ws._sessionId,
					server_id: this.guild.id
				}));
			}
		})

		this.ws.on('message', this.handleWebsocket.bind(this));
		this.ws.on('error', this.handleWebsocketError.bind(this));

		this.ws.once('close', (m) => {
			console.log(m);
		})
	}

	WSSend(payload) {
	    if (typeof payload === "string") {
	      payload = JSON.parse(payload);
	    }

	    this.ws.send(JSON.stringify(payload));
  	}


	handleWebsocket(d, f){
		d = JSON.parse(d);
		console.log(d);
		switch(d.op){
			case VOICE_OP_CODES.HELLO: 
				this.heartbeat = d.d.heartbeat_interval;
				break;
			case VOICE_OP_CODES.HEARTBEAT: 
				this.WSSend(Payloads.HEARTBEAT(this.heartbeat));
				break;
			case VOICE_OP_CODES.READY:
				this.udp_enpoint = d.d.ip;
				this.udp_port = d.d.port;
				this.modes = d.d.modes;
				
				this.ssrc = d.d.ssrc;
				this.nonce.writeUInt32BE(this.ssrc, 8);
				
				this.udp_client = udp.createSocket('udp4');

				this.udp_client.once('message', (p) => {
					let i = 8;
					while(p[i] !== 0){
						i++;
					}
					const ip = p.toString("ascii", 8, i);
					const port = p.readUInt16BE(packet.length - 2);

					console.log(ip + port);

					this.WSSend(Payloads.SELECT_PROTOCOL({ local_ip: ip, local_port: port, mode: this.ENC_TYPE}));
				});

				let packet = new Buffer.allocUnsafe(70);
				packet.writeUInt32BE(0x1, 0);
				packet.writeUInt16BE(70, 2);
				packet.writeUInt32BE(this.ssrc, 4);

				this.sendPacket(packet);
				break;


			case VOICE_OP_CODES.SESSION_DESCRIPTION:
				console.log(d);


		}
	}

	handleWebsocketError(e) {
		console.log(e);
	}


	sendPacket(packet) {
		if(this.udp_client) {
			try {	
				this.udp_client.send(packet, 0, packet.length, this.udp_port, this.udp_enpoint);
			} catch (e) {
				throw new Error(e);
			}
		}
	}
}

module.exports = VoiceDispatcher;