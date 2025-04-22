import "@/config/env.ts";
import { OpenAPIHono } from "@hono/zod-openapi";
import { configureOpenAPI } from "@/lib/configureOpenAPI.ts";
// Handlers
import { errorHandler } from "@/lib/errorHandler.ts";
import { links } from "@/features/links/links.handlers.ts";
import { users } from "@/features/users/users.handlers.ts";
// Middleware
import { logger } from "hono/logger";

const app = new OpenAPIHono({
  strict: false,
  defaultHook: (result) => {
    if (!result.success) {
      throw result.error;
    }
  },
});
// .basePath("/api/v1");

app.use(logger());
app.onError(errorHandler);

app.route("/links", links);
app.route("/users", users);

configureOpenAPI(app);

Deno.serve(app.fetch);
