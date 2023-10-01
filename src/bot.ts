import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import interactionCreate from "./listeners/interactionCreate.ts";
import ready from "./listeners/ready.ts";
import express from "express";

// Custom client to handle commands property
class CustomClient extends Client {
  commands: Collection<string, any>;

  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] });
    this.commands = new Collection<string, any>();
  }
}

// Create an Express server to listen on the specified port
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("render discord amongst the masses");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);

  const client = new CustomClient();

  client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
  });

  ready(client);
  interactionCreate(client);

  client.login(process.env.DISCORD_TOKEN);
});
