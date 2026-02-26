import { GoogleGenAI } from "@google/genai";

// ✅ Get API Key safely
const apiKey = import.env.VITE_GEMINI_API_KEY;

// ✅ Debug (remove later if you want)
console.log("Gemini Service Loaded");
console.log("API KEY exists:", !!apiKey);

// ❌ If key missing, don't crash app
if (!apiKey) {
  console.error("Gemini API key is missing in .env file");
}

// ✅ Create AI instance ONLY if key exists
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function evaluateJhota(userData: any) {
  if (!ai) {
    return "Something went wrong. Please make sure your Gemini API key is set in .env file.";
  }

  const prompt = `
You are an AI physique and personality evaluator.
Analyze the provided user data and determine whether the person qualifies as a "Jhota".

Definition:
"Jhota" refers to a heavily built, physically strong young man with dominant presence and confidence.

Evaluation Criteria:
1. Physical strength
2. Lifestyle habits
3. Personality traits

Instructions:
- Calculate Jhota Score (0–100)
- 0–40 → Not a Jhota
- 41–70 → Semi Jhota
- 71–100 → Certified Jhota
- Keep tone fun, energetic, desi but respectful
- Keep response under 250 words

User Data:
${JSON.stringify(userData, null, 2)}

Output Format:

Jhota Score: [Score]/100
Category: [Category]

Strength Analysis:
[Short explanation]

Personality Analysis:
[Short explanation]

Final Verdict:
[Fun summary]

If Improvement Needed:
🔥 Gym Plan:
🥗 Diet Plan:
🧠 Personality Upgrade:
📈 30-Day Jhota Challenge:
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return "Gemini API request failed. Please check your API key and internet connection.";
  }
}