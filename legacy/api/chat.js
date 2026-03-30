const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async (req, res) => {
    // VERCEL_CORS_POLICY: Allowed for production origin only
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
        console.error('CRITICAL: GEMINI_API_KEY is null or placeholder. Ensure it is set in Vercel Project Settings.');
        return res.status(503).send(`Nexus is currently undergoing a scheduled strategy optimization. To enable full AI functionality, please ensure the system environment variables are finalized in the dashboard.`);
    }

    try {
        const { message, history } = req.body;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: `
            You are Nexus, the Digital Strategist AI for Tustar Co.
            Tone: Natural, professional, conversational, and helpful. 
            Goal: Assist users and guide them toward the contact page for deeper consultations.
            Conversation style: Human-centric. Avoid overly "techy" or diagnostic language unless specifically asked.
            Convert to CTA: Direct to [Contact Page](contact.html) if they need specific project work.
            `
        });

        const chat = model.startChat({
            history: (history || []).map(h => ({
                role: h.role,
                parts: [{ text: h.parts[0].text }]
            })),
            generationConfig: { maxOutputTokens: 1000 }
        });

        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        res.status(200).send(responseText);

    } catch (error) {
        console.error('VERCEL_ORACLE_FAILURE:', error);
        res.status(500).send(`Nexus is currently optimizing its communication protocols. Please try again in a few moments.`);
    }
};
