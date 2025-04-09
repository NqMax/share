// @ts-types="npm:@types/pg@^8.11.11"
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const { Pool } = pg;

const pool = new Pool({
  connectionString: Deno.env.get("DATABASE_URL"),
});

export const db = drizzle({
  client: pool,
  casing: "snake_case",
});
