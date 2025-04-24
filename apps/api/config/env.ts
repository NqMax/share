import "@std/dotenv/load";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

const env = Deno.env.toObject();

envSchema.parse(env);
