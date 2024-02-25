type EnviromentVariableSchemaType = z.infer<typeof enviromentVariableSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnviromentVariableSchemaType {}
  }
}
