import express from "express";
import { startBot } from "./bot";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("render discord amongst the masses");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
  startBot()
    .then(() => {
      console.log("Bot is running!");
    })
    .catch((error) => {
      console.error("Error starting the bot:", error);
    });
});
