import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from "discord.js";

import { Hello } from "./commands/hello.ts";
import { Image } from "./commands/image.ts";
import { Render } from "./commands/render.ts";

export interface Command extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: CommandInteraction) => void;
}

export const Commands: Command[] = [Hello, Image, Render];
