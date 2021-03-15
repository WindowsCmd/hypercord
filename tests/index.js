const { Client } = require("../src/index");
let config = require("./config.json");
let client = new Client();

client.on("ready", async () => {
  console.log("ready!");

  client.setPresence({
    status: "online",
    game: {
      name: "VERY NIAS",
      type: "LISTENING",
    },
    client_status: "mobile",
  });
});

client.on("guild_create", (g) => {

})

client.on("message", (m) => {
  console.log(client.guilds.get(m.guild_id).channels.get(m.channel_id).send("uwu?"));
});

client.login(config.token);
