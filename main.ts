import { Hono } from "@hono/hono";

const app = new Hono();

Deno.serve(app.fetch);
