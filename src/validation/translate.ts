import { languages } from "@/contants/languages";
import { z } from "zod";

const createEnumSchema = (values: any) =>
  z.enum(values, {
    required_error: "Selecione um item!",
  });

export const translateFormSchema = z
  .object({
    from: createEnumSchema(languages.map((language) => language.key)),
    to: createEnumSchema(languages.map((language) => language.key)),
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
