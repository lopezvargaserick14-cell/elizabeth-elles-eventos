import { GoogleGenAI } from "@google/genai";

// En Vite, las variables definidas en vite.config.ts se reemplazan globalmente
const API_KEY = process.env.GEMINI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateEventConcept(prompt: string) {
  const systemInstruction = `Eres un experto planificador de eventos de lujo para Elizabeth Elles. 
  Tu estilo es sofisticado y directo. 
  Genera una lluvia de ideas creativa y CONCRETA basada en la solicitud del usuario. 
  Debes responder en formato JSON.
  Estructura del JSON:
  {
    "nombre": "Nombre del Concepto",
    "paleta": ["Color 1", "Color 2", "Color 3"],
    "elementos": ["Elemento 1", "Elemento 2", "Elemento 3"],
    "tip": "Un tip de ambiente corto",
    "mensajePlanner": "Frase breve sobre por qué Elizabeth Elles es vital para esta idea.",
    "imagePrompt": "Un prompt en inglés detallado para generar una imagen fotorrealista de este concepto de evento de lujo."
  }`;

  try {
    if (!API_KEY) throw new Error("API key is missing");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Modelo ultra-estable y rápido
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error en generateEventConcept:", error);
    throw error;
  }
}

export async function searchTrendingThemes(location: string = "Bucaramanga") {
  const systemInstruction = `Eres un experto en tendencias de eventos de lujo. 
  Identifica la tendencia más fuerte en ${location} hoy.
  Responde en formato JSON.
  Estructura del JSON:
  {
    "nombre": "Nombre de la Tendencia",
    "paleta": ["Color 1", "Color 2", "Color 3"],
    "elementos": ["Elemento 1", "Elemento 2", "Elemento 3"],
    "tip": "Por qué es tendencia ahora",
    "mensajePlanner": "Frase sobre cómo Elizabeth Elles adapta esto con elegancia.",
    "imagePrompt": "Un prompt en inglés detallado para generar una imagen fotorrealista de esta tendencia de evento en Bucaramanga."
  }`;

  try {
    if (!API_KEY) throw new Error("API key is missing");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: `Tendencias en ${location}` }] }],
      config: {
        systemInstruction,
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error en searchTrendingThemes:", error);
    throw error;
  }
}

export async function generateConceptImage(prompt: string) {
  try {
    if (!API_KEY) throw new Error("API key is missing");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Usamos el modelo especializado para imágenes
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      }
    });

    const candidates = response.candidates || [];
    if (candidates.length > 0 && candidates[0].content?.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error en generateConceptImage:", error);
    return null;
  }
}
