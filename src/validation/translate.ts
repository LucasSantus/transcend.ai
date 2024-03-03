import { LanguageEnum } from "@/contants/languages";
import { z } from "zod";

export const translateFormSchema = z
  .object({
    from: LanguageEnum,
    to: LanguageEnum,
    prompt: z
      .string({
        required_error: "Insira o texto para tradução!",
      })
      .min(1, "Insira o texto para tradução!"),
  })
  .refine((data) => data.from !== data.to, {
    message: "O idioma de origem e o idioma de destino devem ser diferentes",
  });

export type TranslateFormData = z.infer<typeof translateFormSchema>;
