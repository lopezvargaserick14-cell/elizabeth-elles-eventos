import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyACrXLa88RaUbUJPG-YOvalh1sqKYsZFY8";
const ai = new GoogleGenAI({ apiKey: API_KEY });

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash",
      contents: [{ role: "user", parts: [{ text: "Hola" }] }]
    });
    console.log("Success:", response.text);
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
