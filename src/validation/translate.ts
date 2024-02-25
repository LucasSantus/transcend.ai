import { z } from "zod";

export const translateFormSchema = z
  .object({
    from: z.enum(["pt-br", "en-us"]).optional(),
    to: z.enum(["pt-br", "en-us"]).optional(),
    textToTranslate: z.string().min(1, "Insira o texto para tradução"),
  })
  .refine((data) => data.from !== data.to, {
    message: "O idioma de origem e o idioma de destino devem ser diferentes",
  });

export type TranslateFormData = z.infer<typeof translateFormSchema>;
