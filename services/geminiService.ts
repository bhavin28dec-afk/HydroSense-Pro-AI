
import { GoogleGenAI, Type } from "@google/genai";
import { getStaticPlantGuide } from "./staticPlantData";

// @ts-ignore
const getAi = () => new GoogleGenAI({ apiKey: window.process?.env?.GEMINI_API_KEY || window.process?.env?.API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY });

export const analyzePlantImage = async (base64Image: string, lang: 'en' | 'hi') => {
  const model = 'gemini-3-flash-preview';
  const languagePrompt = lang === 'hi' 
    ? "Provide the response primarily in Hindi (using Devanagari script) with technical terms in English (Hinglish style)." 
    : "Provide the response in professional English.";

  const prompt = `Act as a professional hydroponics consultant and plant doctor. Analyze this plant image.
  Identify:
  1. Possible nutrient deficiencies (Nitrogen, P, K, Ca, Mg, Fe).
  2. Diseases, pests, or fungal issues.
  3. Symptoms in simple language.
  4. Treatment (Nutrient correction, foliar spray, organic/chemical solutions).
  5. Confidence level (0-100%).
  6. Emergency actions if critical.
  
  ${languagePrompt}
  Format the response in clear Markdown with headings, tables, and warnings. Mention if this applies to Hydroponics only.`;

  const imagePart = {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64Image,
    },
  };

  const response = await getAi().models.generateContent({
    model,
    contents: { parts: [imagePart, { text: prompt }] },
  });

  return response.text;
};

export const getPlantGuide = async (plantName: string, lang: 'en' | 'hi') => {
  // Check static data first
  const staticGuide = getStaticPlantGuide(plantName, lang);
  if (staticGuide) {
    // Simulate slight network delay for UI consistency
    await new Promise(resolve => setTimeout(resolve, 300));
    return staticGuide;
  }

  const model = 'gemini-3-flash-preview';
  const languagePrompt = lang === 'hi' 
    ? "Write in clean, professional, easy-to-read Hindi (Hinglish style, Devanagari script for sentences, English for chemical names)." 
    : "Write in clean, professional, easy-to-read English.";

  const prompt = `You are a professional hydroponic agriculture expert and technical writer.

When a user enters a plant name, generate a COMPLETE professional hydroponic growing guide for: ${plantName}.

The response must follow these rules:

1. ${languagePrompt}
2. Avoid markdown symbols like ###, **, or raw formatting.
3. Use clear headings and structured sections.
4. Present data in bullet points or simple tables when needed.
5. Make the guide suitable for farmers, hobby growers, and commercial hydroponic growers.
6. Keep the tone professional but simple.

Structure the output EXACTLY in this format:

${plantName}

1. Plant Overview
- Scientific name
- Plant type
- Popular varieties

2. Recommended Hydroponic Systems
Explain which systems work best such as:
- NFT (Nutrient Film Technique)
- DWC (Deep Water Culture)
- Kratky Method
- Dutch Bucket
Include short explanation for each.

3. Growth Stages and Timeline
Create a simple table including:
Stage | Duration | Key Activities

Include stages like:
- Germination
- Seedling
- Vegetative growth
- Harvest

4. Nutrient Requirements
Explain the major nutrients required.
Provide:
- Recommended pH range
- EC range
- Important nutrients for the plant

5. Ideal Growing Conditions
Include:
- Temperature
- Humidity
- Lighting hours
- Air circulation

6. Common Problems and Solutions
Explain common issues like:
- nutrient deficiency
- tip burn
- pests
- root rot

7. Harvesting Tips
Explain:
- harvest time
- how to harvest
- yield expectations`;

  const response = await getAi().models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
};

export const getAiNutrientRatios = async (plantName: string, stage: string) => {
  const model = 'gemini-3-flash-preview';
  const prompt = `Act as a plant science expert. Generate a precise hydroponic nutrient formula for "${plantName}" in the "${stage}" stage.
  Provide the result ONLY as a JSON object with the following keys representing Grams per Liter (g/L):
  {
    "cn": number (Calcium Nitrate),
    "fe": number (Iron Chelate),
    "kn": number (Potassium Nitrate),
    "mkp": number (Mono Potassium Phosphate),
    "ks": number (Potassium Sulphate),
    "ms": number (Magnesium Sulphate / Epsom Salt),
    "tm": number (Trace Elements)
  }
  Ensure the values are scientifically accurate for high yield. If a specific salt is not needed, set it to 0.`;

  const response = await getAi().models.generateContent({
    model,
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return null;
  }
};

export const askHydroponicExpert = async (question: string, lang: 'en' | 'hi') => {
  const model = 'gemini-3-flash-preview';
  const langPrompt = lang === 'hi' ? "Answer in Hindi (Hinglish style)." : "Answer in professional English.";
  const prompt = `You are a world-class Hydroponics and Plant Science Consultant. 
  Answer the following question accurately and practically: "${question}".
  ${langPrompt} 
  Keep it concise but detailed where needed. Use bullet points.`;

  const response = await getAi().models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
};
