import { z } from "zod";

export const translateFormSchema = z.object({
  from: z.enum(["pt-br", "en-us"]).optional(),
  to: z.enum(["pt-br", "en-us"]).optional(),
}).refine(data => data.from !== data.to, {
  message: "O idioma de origem e o idioma de destino devem ser diferentes",
});

export type TranslateFormData = z.infer<typeof translateFormSchema>;