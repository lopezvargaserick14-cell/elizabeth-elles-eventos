import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyACrXLa88RaUbUJPG-YOvalh1sqKYsZFY8";
const ai = new GoogleGenAI({ apiKey: API_KEY });

async function listModels() {
  try {
    const list = await ai.models.list();
    // In @google/genai, the response might be an iterator or have a different property
    // Looking at the logs, it seems to have a property that contains the models.
    // Let's iterate if it's iterable.
    for await (const model of list) {
        console.log(model.name);
    }
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
