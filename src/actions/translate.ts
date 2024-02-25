"use server";

import { gemini } from "@/lib/gemini";
import { TranslateFormData, translateFormSchema } from "@/validation/translate";

export async function translateServer(values: TranslateFormData) {
  try {
    const { from, to, textToTranslate } = translateFormSchema.parse(values);

    const model = gemini.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Você sendo um especialista em linguas, dado o texto: "${textToTranslate}" na lingua ${from}, traduza-o o mesmo para ${to}`;

    // Inicia a geração de conteúdo
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar realizar a ação");
  }
}
