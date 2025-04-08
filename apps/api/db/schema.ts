import { pgTable, text, bigint, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userId: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  userName: text(),
  email: text().notNull().unique(),
  role: text().notNull(),
  passwordHash: text().notNull(),
  userCreatedAt: timestamp().defaultNow().notNull(),
});

export const domainsTable = pgTable("domains", {
  domainId: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  domainName: text().notNull().unique(),
});

export const linksTable = pgTable("links", {
  linkId: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  domainId: bigint({ mode: "number" })
    .notNull()
    .references(() => domainsTable.domainId),
  userId: bigint({ mode: "number" })
    .notNull()
    .references(() => usersTable.userId),
  key: text().notNull(),
  shortLink: text().notNull(),
  destinationUrl: text().notNull(),
  linkCreatedAt: timestamp().defaultNow().notNull(),
});
