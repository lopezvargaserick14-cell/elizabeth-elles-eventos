import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyACrXLa88RaUbUJPG-YOvalh1sqKYsZFY8";
const ai = new GoogleGenAI({ apiKey: API_KEY });

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Testing a known stable version
      contents: [{ role: "user", parts: [{ text: "Hola" }] }]
    });
    console.log("Success:", response.text);
  } catch (error: any) {
    console.error("Error code:", error.status);
    console.error("Error message:", error.message);
  }
}

test();
