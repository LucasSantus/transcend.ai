import { env } from "@/env";

type EnviromentVariableSchemaType = z.infer<typeof env>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnviromentVariableSchemaType {}
  }
}
