import { db } from "@/db/client.ts";
import { linksTable } from "@/db/schema.ts";
import { CreateLinkSchema } from "@/features/links/links.schema.ts";
import { sql } from "drizzle-orm";
import { z } from "zod";

async function createLink(
  link: z.infer<typeof CreateLinkSchema>,
  userId: number
) {
  const [createdLink] = await db
    .insert(linksTable)
    .values({
      ...link,
      userId,
      shortLink: sql`(SELECT domain_name || '/' || ${link.key} FROM domains WHERE domain_id = ${link.domainId})`,
    })
    .returning();

  return createdLink;
}

export { createLink };
