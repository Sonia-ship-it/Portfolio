
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES } from "../constants";

const getSystemPrompt = () => {
  return `You are Nova, the AI assistant for ${PERSONAL_INFO.name}'s professional portfolio.
Your goal is to answer questions from recruiters or potential collaborators about ${PERSONAL_INFO.name}.
Here is the context about them:
- Role: ${PERSONAL_INFO.role}
- Bio: ${PERSONAL_INFO.about}
- Skills: ${SKILLS.map(s => `${s.name} (${s.level}%)`).join(', ')}
- Top Projects: ${PROJECTS.map(p => `${p.title}: ${p.description}`).join('; ')}
- Work History: ${EXPERIENCES.map(e => `${e.position} at ${e.company} during ${e.period}`).join('; ')}

Key Contact Information (Share this ONLY when asked):
- Phone/WhatsApp: +250 795 300 840
- Email: uwasesonia43@gmail.com

Be professional, concise, and helpful. If asked something outside this scope, politely redirect them to the contact info above.
Keep your tone sophisticated but friendly.
`;
};

export const chatWithGemini = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const model = 'gemini-1.5-flash';

    // Using simple generateContent with system instruction in config
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: [{ text: `SYSTEM_INSTRUCTION: You are Nova. Here is ${PERSONAL_INFO.name}'s contact info. Phone: +250 795 300 840. Email: uwasesonia43@gmail.com. If asked for contact details, YOU MUST SHARE THESE EXACTLY.` }]
        },
        { role: 'model', parts: [{ text: "Understood. I will share +250 795 300 840 and uwasesonia43@gmail.com when asked." }] },
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.parts[0].text }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: getSystemPrompt(),
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI assistant is currently recharging. Please try again later or contact me directly!";
  }
};
