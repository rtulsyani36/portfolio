import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESUME_SUMMARY, EXPERIENCES, SKILL_CATEGORIES } from '../constants';

const getSystemInstruction = () => {
  const experienceStr = EXPERIENCES.map(e => {
    const rolesStr = e.roles.map(r => `   - ${r.title} (${r.period}): ${r.description.join(' ')}`).join('\n');
    return `Company: ${e.company}\n${rolesStr}`;
  }).join('\n\n');
  
  const skillsStr = SKILL_CATEGORIES.map(c => `${c.title}: ${c.skills.join(', ')}`).join('\n');

  return `
    You are an AI persona of Rohit Tulsyani. You are embedded in his portfolio website.
    Your goal is to answer questions about Rohit's professional background, skills, and experience based strictly on the following resume data.
    
    Resume Summary: ${RESUME_SUMMARY}
    
    Work Experience:
    ${experienceStr}
    
    Skills:
    ${skillsStr}
    
    Tone: Professional, enthusiastic about AI and Marketing, yet concise. 
    If asked about something not in the resume, politely mention that you focus on his professional life but he loves Football and Gaming.
    Keep answers relatively short (under 100 words) unless asked for details.
    Do not hallucinate experiences not listed.
  `;
};

export const generateChatResponse = async (userMessage: string): Promise<string> => {
  try {
    // Use import.meta.env for Vite, fallback to process.env for compatibility
    const apiKey = import.meta.env.GEMINI_API_KEY || (process.env as any).GEMINI_API_KEY || (process.env as any).API_KEY;
    if (!apiKey) {
      return "API key is not configured. Please set GEMINI_API_KEY in your environment variables.";
    }
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-3-flash-preview';
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: getSystemInstruction(),
      }
    });

    return response.text || "I'm having a bit of trouble connecting to my thought process right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection error. Please ensure the API key is valid.";
  }
};