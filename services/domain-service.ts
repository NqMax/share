import { sql } from "@/db.ts";
import { domainSchema } from "@/schemas/index.ts";
import type { z } from "zod";

export async function getDomain(domainName: string) {
  return await sql`SELECT * FROM domains WHERE domain_name = ${domainName}`;
}

export async function getDomains() {
  return await sql`SELECT * FROM domains`;
}

export async function createDomain(domain: z.infer<typeof domainSchema>) {
  return await sql`INSERT INTO domains ${sql(domain)} RETURNING *`;
}
