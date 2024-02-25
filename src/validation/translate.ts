import { z } from "zod";

export const translateFormSchema = z
  .object({
    from: z.enum(["pt-br", "en-us"], {
      required_error: "Selecione uma linguagem!",
    }),
    to: z.enum(["pt-br", "en-us"], {
      required_error: "Selecione uma linguagem!",
    }),
    textToTranslate: z
      .string({
        required_error: "Insira o texto para tradução!",
      })
      .min(1, "Insira o texto para tradução!"),
  })
  .refine((data) => data.from !== data.to, {
    message: "O idioma de origem e o idioma de destino devem ser diferentes",
  });

export type TranslateFormData = z.infer<typeof translateFormSchema>;
