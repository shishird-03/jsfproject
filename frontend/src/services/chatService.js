import api from "./api";

export const ask = async (question) => {
  const res = await api.post("/chat/ask", { question });

  const raw = res.data.answer;

  let parsed;

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.error("Gemini JSON parse error:", error);
    return { answer: "AI response format error." };
  }

  const text =
    parsed.candidates?.[0]?.content?.parts?.[0]?.text ||
    "I couldn't understand the response.";

  return { answer: text };
};
