import { z } from "zod";

export const LanguageEnum = z.enum([
  "de",
  "zh",
  "ko",
  "da",
  "es",
  "fi",
  "fr",
  "el",
  "nl",
  "en-us",
  "ja",
  "pt-br",
  "ru",
  "sv",
]);

export type LanguageEnumType = z.infer<typeof LanguageEnum>;

export const languageEnumOptions: Record<LanguageEnumType, string> = {
  de: "German",
  zh: "Chinese (Simplified)",
  ko: "Korean",
  da: "Danish",
  es: "Spanish",
  fi: "Finnish",
  fr: "French",
  el: "Greek",
  nl: "Dutch",
  "en-us": "English ( American )",
  ja: "Japanese",
  "pt-br": "Portuguese",
  ru: "Russian",
  sv: "Swedish",
};

export const languageEnumValues: Array<{
  key: LanguageEnumType;
  label: string;
}> = Object.values(LanguageEnum.Values).map((key) => ({
  key,
  label: languageEnumOptions[key],
}));
