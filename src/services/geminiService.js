import { GoogleGenAI } from "@google/genai";
import conf from "../config/config";
import { marked } from "marked";

const API_Key = conf.geminiApiKey
const ai = new GoogleGenAI({
    apiKey: API_Key
});

export const geminiService = {
    getGeminiResponse: async (question) => {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: question,
        });

        return marked.parse(response.text)
    }
} 
