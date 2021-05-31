const { VOICE_OP_CODES } = require('../Constants');

module.exports.Identify = ({ server_id, user_id, token, session_id }) => {
	return {
		op: VOICE_OP_CODES.IDENTIFY,
		d: {
			server_id: server_id,
			user_id: user_id,
			token: token,
			session_id: session_id
		}
	}
}

module.exports.HEARTBEAT = (sequence) => {
  return {
    op: VOICE_OP_CODES.HEARTBEAT,
    d: sequence,
  };
};

module.exports.SELECT_PROTOCOL = ({local_ip, local_port, mode}) => {
	return {
		op: VOICE_OP_CODES.SELECT_PROTOCOL,
		d: {
			protocol: "udp",
			data: {
				address: local_ip,
				port: local_port,
				mode: mode
			}
		}
	}
}