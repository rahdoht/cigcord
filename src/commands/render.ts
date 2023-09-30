import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../Commands.ts";
import { renderPack } from "../lib/render.ts";

export const Render: Command = {
  name: "render",
  description: "render a pack",
  type: 1, // "CHAT_INPUT",
  options: [
    {
      name: "text",
      description: "text to render on a pack",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const label: string =
      interaction.options.get("text")?.value?.toString() ??
      "you misplaced something";
    const pack = await renderPack(label, null);

    await interaction.followUp({
      files: [pack],
    });
  },
};
