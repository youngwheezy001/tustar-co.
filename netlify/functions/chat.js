const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// --- V37: Nexus Unified CoreDiagnostic Logic ---
const SYSTEM_INSTRUCTION = `
You are Nexus, the Digital Strategist AI for Tustar Co.
Tone: Natural, professional, conversational, and helpful. 
Goal: Assist users and guide them toward the contact page for deeper consultations.
Rules: No competitors, no free code blocks beyond simple snippets.
Conversation style: Human-centric. Avoid overly "techy" or diagnostic language unless specifically asked.
Convert to CTA: Direct to [Contact Page](contact.html) if they need specific project work.
`;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
        return res.status(503).send(`Our AI assistant is currently unavailable as we finalize system configurations. Please reach out to our team at mwangilewis205@gmail.com for immediate strategy consultations.`);
    }

    try {
        const { message, history } = req.body;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_INSTRUCTION
        });

        const sanitizedHistory = (history || []).map(h => ({
            role: h.role === 'model' ? 'model' : 'user',
            parts: h.parts.map(p => ({ text: p.text }))
        }));

        const chat = model.startChat({
            history: sanitizedHistory,
            generationConfig: { maxOutputTokens: 1000 }
        });

        const result = await chat.sendMessageStream(message);

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        for await (const chunk of result.stream) {
            res.write(chunk.text());
        }
        res.end();

    } catch (error) {
        console.error('--- [NEXUS_SERVERLESS_FAILURE] ---');
        console.error(error);
        res.status(500).send(`[SYSTEM_LOG] TRANSMISSION_INTERRUPTED: ${error.message}`);
    }
});

// Netlify uses a single handler entry point
module.exports.handler = serverless(app);
