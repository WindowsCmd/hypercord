const { Client } = require("../src/index");

let client = new Client();

client.on("ready", () => {
  console.log("ready!");
});

client.on("message", (m) => {
  console.log(m);
});

client.login("ODE3NDg2MDQ5NDYxNjY1ODA0.YEKNNg.PmgVC8zdN5LmuzvN9fVQlecIKpc");
