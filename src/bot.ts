import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import interactionCreate from "./listeners/interactionCreate.ts";
import ready from "./listeners/ready.ts";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

ready(client);
interactionCreate(client);

client.login(process.env.DISCORD_TOKEN);
