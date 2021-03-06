const { Client } = require("../src/index");
let config = require("./config.json");
let client = new Client();

client.on("ready", () => {
  console.log("ready!");
  client.guilds();
});

client.on("message", (m) => {
  console.log(m);
});

client.login(config.token);
