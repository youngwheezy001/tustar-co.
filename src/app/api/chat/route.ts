import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
        return new NextResponse(
            "Nexus is currently undergoing a scheduled strategy optimization. To enable full AI functionality, please ensure the system environment variables are finalized in the dashboard.",
            { status: 503 }
        );
    }

    try {
        const { message, history } = await req.json();
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `
            You are Nexus, the Digital Strategist AI for Tustar Co.
            Tone: Natural, professional, conversational, and helpful. 
            Goal: Assist users and guide them toward the contact page for deeper consultations.
            Conversation style: Human-centric. Avoid overly "techy" or diagnostic language unless specifically asked.
            Convert to CTA: Direct to [Contact Page](/contact) if they need specific project work.
            `
        });

        const chat = model.startChat({
            history: (history || []).map((h: any) => ({
                role: h.role,
                parts: [{ text: h.content || h.parts[0].text }]
            })),
            generationConfig: { maxOutputTokens: 1000 }
        });

        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        return new NextResponse(responseText, { status: 200 });

    } catch (error) {
        console.error("AI_API_FAILURE:", error);
        return new NextResponse(
            "Nexus is currently optimizing its communication protocols. Please try again in a few moments.",
            { status: 500 }
        );
    }
}
