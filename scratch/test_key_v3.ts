import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyACrXLa88RaUbUJPG-YOvalh1sqKYsZFY8";
const ai = new GoogleGenAI({ apiKey: API_KEY });

async function test() {
  console.log("Starting test...");
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: "Hola, responde solo 'OK'" }] }]
    });
    console.log("Full Response:", JSON.stringify(response, null, 2));
    if (response) {
        console.log("Response text:", response.text);
    }
  } catch (error: any) {
    console.error("Caught Error:", error);
  }
}

test();
