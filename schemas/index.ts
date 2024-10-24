import { z } from "zod";

export const domainSchema = z
  .object({
    domain_name: z.string(),
  })
  .strict();

export const urlSchema = z
  .object({
    destination_url: z.string().url(),
    domain_name: z.string(),
    short_path: z.string(),
  })
  .strict();
