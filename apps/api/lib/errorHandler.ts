import type { ErrorHandler } from "hono";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";

export const errorHandler: ErrorHandler = (err, c) => {
  console.error(err);

  if (err instanceof HTTPException) {
    const { message, status } = err;
    return c.json({ error: { message } }, status);
  }

  if (err instanceof z.ZodError) {
    const message = "Validation Error";
    const details = [];

    for (const issue of err.issues) {
      const detail = `Field '${issue.path.join(".")}': ${issue.message}`;
      details.push(detail);
    }
    return c.json({ error: { message, details } }, 400);
  }

  return c.json({ error: { message: "Internal server error" } }, 500);
};
