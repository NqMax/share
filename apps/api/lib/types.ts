import { UserSchema } from "@/features/users/users.schema.ts";
import { z } from "zod";

export type Variables = { Variables: { payload: z.infer<typeof UserSchema> } };
