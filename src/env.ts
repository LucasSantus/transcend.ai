import { z } from "zod";

export const envSchema = z.object({
  // NEXT
  PORT: z.string().default("3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // DATABASE
  GEMINI_AI_API_KEY: z.string(),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.log("Oops, there was a problem loading the environment variables!");
  console.error(envParsed.error.issues);
  process.exit(1);
}

export const env = envParsed.data;
