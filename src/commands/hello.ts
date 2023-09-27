import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../Commands.ts";

export const Hello: Command = {
  name: "hello",
  description: "Returns a greeting",
  type: 1, // "CHAT_INPUT",
  options: [
    {
      name: "text",
      description: "Text to include in the greeting",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const text = interaction.options.get("text")?.value;
    const content = `hello world: ${text}`;

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
