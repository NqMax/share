import { createRoute } from "@hono/zod-openapi";
import { LinkSchema, CreateLinkSchema } from "@/features/links/links.schema.ts";

export const createLinkRoute = createRoute({
  tags: ["Links"],
  method: "post",
  path: "/",
  description: "Create a new link",
  request: {
    body: {
      content: { "application/json": { schema: CreateLinkSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: "Created link",
      content: {
        "application/json": {
          schema: LinkSchema,
        },
      },
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
});
