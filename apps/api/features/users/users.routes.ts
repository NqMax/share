import { createRoute, z } from "@hono/zod-openapi";
import { UserSchema, CreateUserSchema } from "@/features/users/users.schema.ts";

export const createUserRoute = createRoute({
  tags: ["Users"],
  method: "post",
  path: "/",
  description: "Create a new user",
  request: {
    body: {
      content: { "application/json": { schema: CreateUserSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: UserSchema.extend({
            jwt: z.string().openapi({
              description: "JWT token for the user",
            }),
          }),
        },
      },
      description: "Created user",
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
});
