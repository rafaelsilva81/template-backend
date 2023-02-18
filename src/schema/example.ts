import { z } from "zod";

export const createExampleSchema = z.object({
  foo: z.string(),
  bar: z.string().optional(),
});

export const updateExampleSchema = createExampleSchema.partial();
