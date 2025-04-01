import { createMiddleware } from "hono/factory";
import * as jose from "jose";
import { HTTPException } from "hono/http-exception";

export function jwtAuth(requiredRoles?: string[]) {
  return createMiddleware(async (c, next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    try {
      const secret = new TextEncoder().encode(Deno.env.get("JWT_SECRET"));
      const { payload: fullPayload } = await jose.jwtVerify(token, secret);
      const { iat: _iat, ...payload } = fullPayload;

      if (requiredRoles && !requiredRoles.includes(payload.role as string)) {
        throw new HTTPException(403, {
          message: "Forbidden: Insufficient permissions",
        });
      }

      c.set("payload", payload);

      await next();
    } catch (err) {
      console.error(err);
      // TODO: Handle token expiration
      throw new HTTPException(401, { message: "Unauthorized" });
    }
  });
}
