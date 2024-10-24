import { validator } from "@hono/hono/validator";
import { z } from "zod";

export function JSONValidator<T extends z.ZodTypeAny>(schema: T) {
  return validator("json", (value, c) => {
    const parsedBody = schema.safeParse(value);

    if (!parsedBody.success) {
      c.status(400);
      return c.json({ error: parsedBody.error.flatten() });
    }

    return parsedBody.data as z.infer<T>;
  });
}
