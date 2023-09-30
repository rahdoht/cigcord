import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import interactionCreate from "./listeners/interactionCreate.ts";
import ready from "./listeners/ready.ts";

// Custom client to handle commands property
class CustomClient extends Client {
  commands: Collection<string, any>;

  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] });
    this.commands = new Collection<string, any>();
  }
}

const client = new CustomClient();

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

ready(client);
interactionCreate(client);

client.login(process.env.DISCORD_TOKEN);
