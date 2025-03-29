import { z } from "zod";
import { ZodSchema } from "zod";
import { ValidationTargets } from "hono/types";
import { validator } from "hono/validator";

export function zodValidator<T extends ZodSchema>(
  target: keyof ValidationTargets,
  schema: T
) {
  return validator(target, async (value, c) => {
    const parsedBody = await schema.parseAsync(value);

    return parsedBody as z.infer<T>;
  });
}
