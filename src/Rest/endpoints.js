module.exports.BASE = "https://discordapp.com/api/v8";
module.exports.CDN = "https://cdn.discordapp.com";
module.exports.CHANNEL = (id) => `/channel/${id}`;
module.exports.CHANNELS = (id) => `/users/${id}/channels`;
module.exports.CHANNEL_MESSAGES = (id) => `/channels/${id}/messages`;
