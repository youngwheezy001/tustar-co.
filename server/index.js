const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3001;

// --- V29: Nexus Core Diagnostic Layer ---
let isOracleOperational = false;
let oracleError = null;

try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        throw new Error("MISSING_API_KEY");
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    isOracleOperational = true;
    console.log('[NEXUS_CORE] ORACLE_SYSTEM_INITIALIZED: ONLINE');
} catch (err) {
    oracleError = err.message;
    console.error(`[NEXUS_CORE] ORACLE_SYSTEM_FAILURE: ${oracleError}`);
}

app.use(cors());
app.use(express.json());

const SYSTEM_INSTRUCTION = `
You are Nexus, the Digital Strategist AI for Tustar Co.
Tone: Natural, professional, conversational, and helpful. 
Goal: Assist users and guide them toward the contact page for deeper consultations.
Rules: No competitors, no free code blocks beyond simple snippets.
Conversation style: Human-centric. Avoid overly "techy" or diagnostic language unless specifically asked.
Convert to CTA: Direct to [Contact Page](contact.html) if they need specific project work.
`;

app.post('/api/chat', async (req, res) => {
        return res.status(503).send(`Our AI assistant is temporarily offline while we update its core logic. Please feel free to reach out directly via our contact page for immediate assistance.`);

    try {
        const { message, history } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_INSTRUCTION
        });

        // V29 History Sanitization
        const sanitizedHistory = (history || []).map(h => ({
            role: h.role,
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
        console.error('--- [MISSION_CRITICAL_FAILURE] ---');
        console.error(error);
        res.status(500).send(`[SYSTEM_LOG] TRANSMISSION_INTERRUPTED: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`[TUSTAR_COMMAND_CENTER] MISSION_CONTROL_READY on port ${port}`);
});
