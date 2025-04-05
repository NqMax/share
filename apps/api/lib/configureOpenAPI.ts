import { Scalar } from "@scalar/hono-api-reference";
import type { OpenAPIHono } from "@hono/zod-openapi";
import type { Env } from "hono/types";
import DenoJSON from "@/deno.json" with { type: "json" };

export function configureOpenAPI(app: OpenAPIHono<Env, {}, string>) {
  app.doc("/doc", {
    openapi: "3.1.0",
    info: {
      title: "Share API",
      version: DenoJSON.version,
    },
  });

  app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "JWT Bearer Token",
  });

  app.get("/docs", Scalar({ url: "/doc", theme: "elysiajs" }));
}
