const { GATEWAY_OP_CODES } = require("../Constants");

module.exports.HEARTBEAT = (sequence) => {
  return {
    op: GATEWAY_OP_CODES.HEARTBEAT,
    d: sequence,
  };
};

module.exports.IDENTIFY = (data) => {
  return {
    op: GATEWAY_OP_CODES.IDENTIFY,
    d: {
      token: data.token || null,
      properties: {
        $os: require("os").platform(),
        $browser: "Hypercord",
        $device: "Hypercord",
      },
    },
  };
};

module.exports.RESUME = (data) => {
  return {
    op: GATEWAY_OP_CODES.RESUME,
    d: {
      token: data.token,
      session_id: data.session_id,
      seq: data.seq,
    },
  };
};
