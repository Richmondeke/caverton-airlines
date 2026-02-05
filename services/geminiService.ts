
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLogisticsAdvice = async (query: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a logistics expert. Answer the following user question about cargo, shipping, or supply chain: ${query}`,
    });
    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while trying to process your request. Please check your network connection or try again later.";
  }
};

export const summarizeShipmentStatus = async (shipmentData: any): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the status and potential risks for this shipment: ${JSON.stringify(shipmentData)}`,
    });
    return response.text || "Status summary unavailable.";
  } catch (error) {
    return "Could not summarize status.";
  }
};
