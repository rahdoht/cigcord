import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../Commands.ts";
import { renderPack } from "../lib/render.ts";
import { insertRecord } from "../lib/supabase.ts";

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
    const metadata = {
      globalName: interaction.user.globalName,
      displayName: interaction.user.displayName,
    };

    try {
      const { cigNumber, path } = await renderPack(label, null);
      console.log(`rendered "${label}" on ${cigNumber}`);

      insertRecord(label, cigNumber, JSON.stringify(metadata), "cigcord");

      await interaction.followUp({
        files: [path],
      });
    } catch (error) {
      console.error(`failed to render ${label}: ${JSON.stringify(error)}`);
    }
  },
};
