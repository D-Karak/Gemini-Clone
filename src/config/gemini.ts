import { GoogleGenAI } from "@google/genai";
export default async function runChat(prompt: string) {
    // console.log(prompt); //for testing if the prompt is received or not
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!API_KEY) {
        throw new Error("VITE_GEMINI_API_KEY is not defined in .env");
    }
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const genaration_config = {
        temperature: 0.7,
        topP: 1,
        topK: 1,
        maxOutputTokens: 1000,
        stopSequences: [],
    }

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: genaration_config,
    });

    // console.log(response.text); //for testing if the response is received or not
    return (
        response.text ? response.text : "Please try again"
    )
}   