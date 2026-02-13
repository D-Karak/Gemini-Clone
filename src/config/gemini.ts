import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
export default async function runChat(prompt: string) {

    const API_KEY = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    async function main() {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });
        return response.text;
    }
    await main();
}