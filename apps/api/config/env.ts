import { z } from "zod";
import { load } from "@std/dotenv";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

const env = await load({ export: true });

envSchema.parse(env);
