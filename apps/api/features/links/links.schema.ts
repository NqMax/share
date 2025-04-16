import { linksTable } from "@/db/schema.ts";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const LinkSchema = createSelectSchema(linksTable, {
  linkId: (z) =>
    z.openapi({
      description: "Unique identifier for the link",
      example: 123,
    }),
  domainId: (z) =>
    z.openapi({
      description: "ID of the domain this link belongs to",
      example: 1,
    }),
  userId: (z) =>
    z.openapi({
      description: "ID of the user who owns this link",
      example: 1,
    }),
  key: (z) =>
    z.openapi({
      description: "Unique key/slug used in the shortened URL",
      example: "my-awesome-link",
    }),
  shortLink: (z) =>
    z.openapi({
      description: "Complete shortened URL including domain and key",
      example: "share.io/my-awesome-link",
    }),
  destinationUrl: (z) =>
    z.openapi({
      description: "Full URL that users will be redirected to",
      example: "https://example.com/",
    }),
  linkCreatedAt: (z) =>
    z.openapi({
      description: "Timestamp when the link was created",
      example: "2025-04-21T14:30:00.000Z",
    }),
});

export const CreateLinkSchema = createInsertSchema(linksTable, {
  domainId: (z) =>
    z.openapi({
      description: "The ID of the domain",
      example: 1,
    }),
  userId: (z) =>
    z.openapi({
      description: "The ID of the user the link will be created for",
      example: 1,
    }),
  key: (z) =>
    z.min(1).openapi({
      description: "The unique key for the link",
      example: "my-awesome-link",
    }),
  destinationUrl: (z) =>
    z.url().openapi({
      description: "The destination URL for the link",
      example: "https://example.com/",
    }),
}).omit({ shortLink: true, linkCreatedAt: true });
