import bcrypt from "bcryptjs";
import { HTTPException } from "hono/http-exception";
import { db } from "@/db/client.ts";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema.ts";
import { CreateUserSchema } from "./users.schema.ts";
import { z } from "zod";

async function getUser(value: number | string) {
  const field = typeof value === "number" ? "userId" : "email";

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable[field], value));

  return user;
}

async function createUser(user: z.infer<typeof CreateUserSchema>) {
  const { email, password } = user;

  const existingUser = await getUser(email);

  if (existingUser) {
    throw new HTTPException(400, { message: "Account already exists." });
  }

  const hash = await bcrypt.hash(password, 10);

  const [createdUser] = await db
    .insert(usersTable)
    .values({
      email,
      passwordHash: hash,
      role: "user",
    })
    .returning({
      userId: usersTable.userId,
      userName: usersTable.userName,
      email: usersTable.email,
      role: usersTable.role,
      userCreatedAt: usersTable.userCreatedAt,
    });

  return createdUser;
}

export { createUser };
