module.exports.BASE = "https://discordapp.com/api/v6";
module.exports.CDN = "https://cdn.discordapp.com";
module.exports.CHANNEL = (id) => `/channel/${id}`;
module.exports.CHANNELS = (id) => `/users/${id}/channels`;
module.exports.CHANNEL_MESSAGES = (id) => `/channels/${id}/messages`;
module.exports.GUILDS = `/users/@me/guilds`;
module.exports.GUILD = (id) => `/guilds/${id}`;
