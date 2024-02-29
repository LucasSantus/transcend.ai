import { gemini } from "@/lib/gemini";
import {
  defaultSafetySettings,
  mapSafetySettings,
} from "@/utils/safety-settings-mapper";
import { translateFormSchema } from "@/validation/translate";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(request: Request) {
  const parseResult = translateFormSchema.safeParse(await request.json());

  if (!parseResult.success) {
    return new Response(JSON.stringify({ error: "Invalid request data" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { prompt, from, to } = parseResult.data;

  const prompts = `Você sendo um especialista em linguas, dado o texto: "${prompt}" na lingua ${from}, traduza-o o mesmo para ${to}`;

  const mappedSafetySettings = mapSafetySettings(defaultSafetySettings);

  const geminiStream = await gemini
    .getGenerativeModel({
      model: "gemini-pro",
      safetySettings: mappedSafetySettings,
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.7,
      },
    })
    .generateContentStream([prompts]);

  const stream = GoogleGenerativeAIStream(geminiStream);

  return new StreamingTextResponse(stream);
}
