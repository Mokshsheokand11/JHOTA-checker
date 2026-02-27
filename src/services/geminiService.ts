import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function evaluateJhota(userData: any) {
  const prompt = `
    You are an AI physique and personality evaluator.
    Your task is to analyze the provided user data and determine whether the person qualifies as a "Jhota".

    Definition:
    "Jhota" (slang) refers to a heavily built, physically strong young man with raw power, muscular build, dominant presence, and confident personality.

    Evaluation Criteria:
    1. Physical strength (height, weight, muscle mass, pushups, bench press, activity level)
    2. Lifestyle (gym frequency, diet quality, protein intake, physical work)
    3. Personality traits (dominance, leadership, competitiveness, confidence)

    Instructions:
    1. Calculate a Jhota Score from 0 to 100.
    2. Categorize:
       - 0–40 → Not a Jhota
       - 41–70 → Semi Jhota
       - 71–100 → Certified Jhota
    3. Keep tone fun, energetic, slightly desi but respectful.
    4. Keep response under 250 words total.

    Output Format:
    You MUST respond with a raw JSON array of objects. Do not wrap it in markdown code blocks like \`\`\`json. Only output the JSON array.
    Each object in the array must represent a "card" of the evaluation and have exactly these two keys:
    - "title": A short, catchy title containing an emoji (e.g. "🏆 Score & Category").
    - "content": A markdown string with the detailed content for that card.

    Provide EXACTLY 4 cards in the array:
    1. Title: "🏆 Score & Category", Content: Jhota score and category.
    2. Title: "💪 Strength Analysis", Content: Review of their physical stats.
    3. Title: "🧠 Personality Analysis", Content: Review of their personality stats.
    4. Title: "🔥 Action Plan", Content: Final verdict and improvement plan.

    User Data:
    ${JSON.stringify(userData, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    let text = response.text || "[]";
    // Strip markdown formatting if AI still includes it
    if (text.startsWith('\`\`\`json')) {
      text = text.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
    } else if (text.startsWith('\`\`\`')) {
      text = text.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Error evaluating Jhota:", error);
    throw error;
  }
}
