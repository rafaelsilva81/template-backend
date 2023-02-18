import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().transform((port) => parseInt(port)),
  DATABASE_URL: z.string().url(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    _env.error.flatten().fieldErrors
  );

  process.exit(1);
}

export const env = _env.data;
