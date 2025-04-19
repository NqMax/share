import { OpenAPIHono } from "@hono/zod-openapi";
import * as jose from "jose";
import { createUser } from "@/features/users/users.services.ts";
import { createUserRoute } from "@/features/users/users.routes.ts";

const users = new OpenAPIHono();

users.openapi(createUserRoute, async (c) => {
  const data = c.req.valid("json");
  const user = await createUser(data);

  const jwt = await new jose.SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(new TextEncoder().encode(Deno.env.get("JWT_SECRET")));

  return c.json({ ...user, jwt }, 201);
});

export { users };
