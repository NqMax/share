import { Hono } from "@hono/hono";
import { JSONValidator } from "@/middleware/validators.ts";
import { urlSchema } from "@/schemas/index.ts";
// Service
import { createUrl } from "@/services/url-service.ts";

const app = new Hono();

app.post("/urls", JSONValidator(urlSchema), async (c) => {
  const body = c.req.valid("json");

  const result = await createUrl(body);

  c.status(201);
  return c.json(result);
});

export default app;
