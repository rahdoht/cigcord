import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from "discord.js";

import { Hello } from "./commands/hello";
import { Image } from "./commands/image";
import { Render } from "./commands/render";

export interface Command extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: CommandInteraction) => void;
}

export const Commands: Command[] = [Hello, Image, Render];
