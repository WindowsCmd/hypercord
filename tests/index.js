const { Client } = require("../src/index");

let client = new Client();

client.on("ready", () => {
  console.log("ready!");
});

client.on("message", (m) => {
  console.log(m);
});

client.login("ODE3NDg2MDQ5NDYxNjY1ODA0.YEKNNg.-nHhmiXE2IFYrGs-N7so4a-EvVQ");
