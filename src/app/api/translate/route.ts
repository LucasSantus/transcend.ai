import { gemini } from "@/lib/gemini";

export const runtime = "edge";

export async function POST(req: Request) {
  const { translate } = await req.json();

  const model = gemini.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Você sendo um especialista em linguas, dado o texto: "${translate}" na lingua pt-br, traduza-o o mesmo para en-us`;

  // Inicia a geração de conteúdo
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  // Retorna o texto como uma string dentro de uma resposta
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
