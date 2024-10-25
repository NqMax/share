import { Hono } from "@hono/hono";
import { zodValidator } from "@/middleware/zodValidators.ts";
import { domainSchema } from "@/schemas/index.ts";
// Service
import {
  createDomain,
  getDomain,
  getDomains,
} from "@/services/domain-service.ts";

const app = new Hono();

app.get("/domains", async (c) => {
  const result = await getDomains();

  return c.json(result);
});

app.get("/domains/:domain_name", async (c) => {
  const domainName = c.req.param("domain_name");
  const result = await getDomain(domainName);

  if (result.length === 0) {
    c.status(404);
    return c.json({ message: "Domain not found" });
  }

  return c.json(result);
});

app.post("/domains", zodValidator("json", domainSchema), async (c) => {
  const body = c.req.valid("json");

  const result = await createDomain(body);

  c.status(201);
  return c.json(result);
});

export default app;
