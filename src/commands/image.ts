import { CommandInteraction, Client } from "discord.js";
import { Command } from "../Commands.ts";

export const Image: Command = {
  name: "img",
  description: "Returns an image",
  type: 1, // "CHAT_INPUT",
  run: async (client: Client, interaction: CommandInteraction) => {
    await interaction.followUp({
      files: ["assets/3002.jpg"],
    });
  },
};
