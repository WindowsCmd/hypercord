const { GATEWAY_OP_CODES } = require("../Constants");

module.exports.HEARTBEAT = (sequence) => {
  return {
    op: GATEWAY_OP_CODES.HEARTBEAT,
    d: sequence,
  };
};

module.exports.VOICE_STATE_UPDATE = (data) => {
  return {
    op: GATEWAY_OP_CODES.VOICE_STATE_UPDATE,
    d: {
      guild_id: data.guild_id,
      channel_id: data.channel_id,
      self_deaf: data.deaf,
      self_mute: data.self_mute
    }
  }
}

module.exports.IDENTIFY = (data) => {
  return {
    op: GATEWAY_OP_CODES.IDENTIFY,
    d: {
      token: data.token || null,
      intents: data.intents,
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

module.exports.PRESENSE = (data) => {
  return {
    op: GATEWAY_OP_CODES.PRESENCE_UPDATE,
    d: {
      game: {
        name: data.game.name || null,
        type: data.game.type || 0,
        url: data.game.url || null,
      },
      status: data.status || "online",
      client_status: data.client_status || "desktop",
      since: data.since || Date.now(),
      afk: !!data.afk,
    },
  };
};
