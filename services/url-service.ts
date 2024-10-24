import { sql } from "@/db.ts";
import { urlSchema } from "@/schemas/index.ts";
import type { z } from "zod";

export async function createUrl(url: z.infer<typeof urlSchema>) {
  return await sql`INSERT INTO urls ${sql(url)} RETURNING *`;
}
