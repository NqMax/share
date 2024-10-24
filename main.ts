import { Hono } from "@hono/hono";
import domains from "@/routes/domains.ts";
import urls from "@/routes/urls.ts";
import { showRoutes } from "@hono/hono/dev";
import { logger } from "@hono/hono/logger";

const app = new Hono();
app.use(logger());

app.route("/", domains);
app.route("/", urls);

showRoutes(app, {
  verbose: true,
});

Deno.serve(app.fetch);
