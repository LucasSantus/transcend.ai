import { z } from "zod";

export const languages = [
  {
    key: "de",
    label: "Alemão",
  },
  {
    key: "zh",
    label: "Chinês (Simplificado)",
  },
  {
    key: "ko",
    label: "Coreano",
  },
  {
    key: "da",
    label: "Dinamarquês",
  },
  {
    key: "es",
    label: "Espanhol",
  },
  {
    key: "fi",
    label: "Finlandês",
  },
  {
    key: "fr",
    label: "Francês",
  },
  {
    key: "el",
    label: "Grego",
  },
  {
    key: "nl",
    label: "Holandês",
  },
  {
    key: "en-us",
    label: "Inglês ( Americano )",
  },
  {
    key: "it",
    label: "Italiano",
  },
  {
    key: "ja",
    label: "Japonês",
  },
  {
    key: "pt-br",
    label: "Português",
  },
  {
    key: "ru",
    label: "Russo",
  },
  {
    key: "sv",
    label: "Sueco",
  },
];

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
