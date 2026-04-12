import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

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

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json"
    }
  });

  return JSON.parse(response.text || "{}");
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

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Tendencias en ${location}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json"
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function generateConceptImage(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [{ text: prompt }],
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: "1K"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
