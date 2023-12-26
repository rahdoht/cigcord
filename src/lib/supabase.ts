import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_KEY || ""
);

export async function insertRecord(
  caption: string,
  cignum: number,
  metadata: string,
  origin: string
): Promise<any[] | null> {
  if (!caption || !cignum) {
    console.warn("Caption and cignum required.");
    return null;
  }

  const { data, error } = await supabase
    .from("renders")
    .insert([
      {
        caption,
        cignum,
        metadata,
        origin,
      },
    ])
    .select();
  console.log("inserted record:", data);

  if (error) {
    console.error(`failed to insert data: ${JSON.stringify(error)}`);
  }

  return data;
}
