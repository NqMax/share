import { usersTable } from "@/db/schema.ts";
import { z } from "@hono/zod-openapi";
import { createSelectSchema } from "drizzle-zod";

export const UserSchema = createSelectSchema(usersTable, {
  userId: (z) => z.openapi({
    description: "Unique identifier for the user",
    example: 1
  }),
  userName: (z) => z.openapi({
    description: "Display name of the user",
    example: "John Doe"
  }),
  email: (z) => z.openapi({
    description: "User's email address",
    example: "user@example.com"
  }),
  role: (z) => z.openapi({
    description: "User's role in the system that determines access permissions",
    example: "user",
    enum: ["user", "admin"]
  }),
  userCreatedAt: (z) => z.openapi({
    description: "Timestamp when the user account was created",
    example: "2025-04-21T10:15:30.000Z"
  })
}).omit({
  passwordHash: true,
});

export const CreateUserSchema = z.object({
  email: z.string().email().openapi({
    description: "User's email address",
    example: "user@example.com",
  }),
  password: z.string().min(8).openapi({
    description: "User's password",
    example: "securePassword123",
  }),
});
