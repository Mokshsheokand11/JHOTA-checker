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
    4. Keep response under 250 words.

    If the score is below 70:
    Provide a clear improvement plan including:
    - Physical training improvements
    - Diet changes
    - Lifestyle upgrades
    - Personality development tips
    - Give practical weekly goals

    Output Format (Strictly follow this):

    Jhota Score: [Score]/100
    Category: [Category]

    Strength Analysis:
    [Short explanation]

    Personality Analysis:
    [Short explanation]

    Final Verdict:
    [Fun summary]

    If Improvement Needed:
    🔥 Gym Plan: [Plan]
    🥗 Diet Plan: [Plan]
    🧠 Personality Upgrade: [Tips]
    📈 30-Day Jhota Challenge: [Goals]

    User Data:
    ${JSON.stringify(userData, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error evaluating Jhota:", error);
    throw error;
  }
}
