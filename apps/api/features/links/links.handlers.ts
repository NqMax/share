import { OpenAPIHono } from "@hono/zod-openapi";
// Middleware
import { jwtAuth } from "@/middleware/jwtAuth.ts";
// Services
import { createLink } from "@/features/links/links.services.ts";
// Types
import type { Variables } from "@/lib/types.ts";
// Routes
import { createLinkRoute } from "@/features/links/links.routes.ts";

const links = new OpenAPIHono<Variables>();

links.use(jwtAuth());

links.openapi(createLinkRoute, async (c) => {
  const payload = c.get("payload");
  const data = c.req.valid("json");

  const result = await createLink(data, payload.userId);

  return c.json(result, 201);
});

export { links };
