import { validator } from "@hono/hono/validator";
import { z } from "zod";
import { ValidationTargets } from "@hono/hono/types";

export function zodValidator<T extends z.ZodTypeAny>(
  target: keyof ValidationTargets,
  schema: T
) {
  return validator(target, (value, c) => {
    const parsedBody = schema.safeParse(value);

    if (!parsedBody.success) {
      c.status(400);
      return c.json({ error: parsedBody.error.flatten() });
    }

    return parsedBody.data as z.infer<T>;
  });
}
