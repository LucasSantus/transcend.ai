import { env } from "@/env";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const gemini = new GoogleGenerativeAI(
  env.GEMINI_AI_API_KEY
);
