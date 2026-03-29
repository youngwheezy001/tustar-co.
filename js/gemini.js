/**
 * Tustar Co. Nexus Oracle V2.1 (Command Center)
 * Lead Digital Strategist AI Connector
 * 🏛️🤖 V28 Premium Aesthetic & Universal Connectivity
 */

const ORACLE_CONFIG = {
    BACKEND_URL: window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
        ? "http://127.0.0.1:3001/api/chat"
        : "https://tustar-api.onrender.com/api/chat", // Replace with your Render URL
    DEFAULT_SENDER: "NEXUS ORACLE"
};

document.addEventListener('DOMContentLoaded', () => {
    const oracleToggle = document.getElementById('nexus-oracle-toggle');
    const oracleContainer = document.getElementById('nexus-oracle-container');
    const oracleGlow = document.getElementById('nexus-oracle-glow');
    const oracleLabel = document.getElementById('oracle-status-label');
    const socialLabel = document.getElementById('social-status-label');
    const oracleInput = document.getElementById('oracle-input');
    const oracleOutput = document.getElementById('oracle-output');
    const oracleClose = document.getElementById('oracle-close');
    const oracleForm = document.getElementById('oracle-form');

    if (!oracleToggle || !oracleContainer) return;

    let chatHistory = [];

    // 1. Initial Aesthetic Sequences
    initAIAura();
    typeStatusLabel("NEXUS AI // ONLINE", oracleLabel);
    typeStatusLabel("STRATEGIC // CONNECT", socialLabel);
    initFloatingBehavior();

    function initAIAura() {
        // V34 Nexus Atmospheric Aura Implementation
        const particles = [];
        for (let i = 0; i < 6; i++) {
            const p = document.createElement('div');
            p.className = 'aura-particle';
            const size = 100 + Math.random() * 200;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            oracleOutput.appendChild(p);
            particles.push(p);

            gsap.set(p, {
                x: Math.random() * 80 + '%',
                y: Math.random() * 80 + '%',
                opacity: 0
            });

            // Subtle Floating Animation
            gsap.to(p, {
                x: '+=15%',
                y: '+=15%',
                opacity: 0.12,
                duration: 6 + Math.random() * 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Secondary Glow Sync
        gsap.set(oracleGlow, { opacity: 0, scale: 0.5 });
        gsap.to(oracleGlow, {
            opacity: 0.8,
            scale: 1.5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    function initFloatingBehavior() {
        // AI Toggle Floating
        if (oracleToggle) {
            gsap.to(oracleToggle, {
                y: "-12px",
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Social Trigger Floating (Async Check)
        const findSocialTrigger = setInterval(() => {
            const trg = document.querySelector('.social-trigger');
            if (trg) {
                clearInterval(findSocialTrigger);
                gsap.to(trg, {
                    y: "-12px",
                    duration: 3.2, // Slightly offset rhythm for more natural feel
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        }, 500);
    }

    function typeStatusLabel(text, element) {
        if (!element) return;
        let i = 0;
        element.innerHTML = "";
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                gsap.to(element, { opacity: 0.5, duration: 1, repeat: -1, yoyo: true });
            }
        }, 80);
    }

    // 2. Interactive UI Logic
    oracleToggle.addEventListener('click', () => {
        const isOpen = oracleContainer.style.display === 'flex';
        if (!isOpen) {
            gsap.to(oracleContainer, { display: 'flex', opacity: 1, y: 0, duration: 0.6, ease: "power4.out" });
            oracleInput.focus();
        } else {
            closeOracle();
        }
    });

    oracleClose.addEventListener('click', closeOracle);

    function closeOracle() {
        gsap.to(oracleContainer, {
            opacity: 0, y: 30, duration: 0.4, ease: "power4.in", onComplete: () => {
                oracleContainer.style.display = 'none';
            }
        });
    }

    // 3. Circular Social Connection Logic (V29 Mission Hub Architecture)
    initSocialHub();

    function initSocialHub() {
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.social-trigger');
            if (!trigger) return;

            const hub = trigger.closest('.social-connect-hub');
            if (!hub) return;

            const items = hub.querySelectorAll('.social-item');
            if (items.length === 0) return;

            hub.dataset.expanded = hub.dataset.expanded === 'true' ? 'false' : 'true';
            const expanded = hub.dataset.expanded === 'true';
            const radius = 90; // Compact V30 Radius
            const total = items.length;

            if (expanded) {
                // High-fidelity 360-degree rotation
                gsap.to(trigger, { rotation: 360, duration: 0.8, ease: "back.out(1.2)" });

                items.forEach((item, index) => {
                    const angle = (index / (total - 1)) * (Math.PI / 1.5) - (Math.PI / 1.3); // Tighter V30 Arc
                    const x = Math.cos(angle) * (radius * -1);
                    const y = Math.sin(angle) * (radius * 1.2);

                    gsap.fromTo(item,
                        { x: 0, y: 0, scale: 0, opacity: 0, visibility: 'visible' },
                        { x, y, scale: 1, opacity: 1, duration: 0.5, delay: index * 0.1, ease: "back.out(1.7)" }
                    );
                });
            } else {
                gsap.to(trigger, { rotation: 0, duration: 0.8, ease: "back.in(1.2)" });
                items.forEach((item, index) => {
                    gsap.to(item, {
                        x: 0, y: 0, scale: 0, opacity: 0, duration: 0.3, onComplete: () => {
                            item.style.visibility = 'hidden';
                        }
                    });
                });
            }
        });
    }

    // 4. Real-time Mission Monitoring Logic (V29 Diagnostics)
    oracleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const prompt = oracleInput.value.trim();
        if (!prompt) return;

        appendMessage('USER', prompt);
        oracleInput.value = '';

        const loadingMsg = appendMessage(ORACLE_CONFIG.DEFAULT_SENDER, 'Looking into that for you...');
        let fullResponse = "";

        try {
            const response = await fetch(ORACLE_CONFIG.BACKEND_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: prompt, history: chatHistory })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            loadingMsg.innerHTML = "";
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                fullResponse += decoder.decode(value, { stream: true });
                loadingMsg.innerHTML = formatAIResponse(fullResponse);
                oracleOutput.scrollTop = oracleOutput.scrollHeight;
            }

            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            chatHistory.push({ role: "model", parts: [{ text: fullResponse }] });

        } catch (error) {
            console.error('--- [NEXUS_DISCONNECT] ---');
            console.error(error);
            loadingMsg.innerHTML = `<span style="opacity: 0.8; font-weight: 700; color: var(--accent-color);">One moment...</span><br><br>I'm having a bit of trouble connecting to the network. Feel free to reach out to us at <a href="mailto:mwangilewis205@gmail.com" style="color:var(--accent-color);">mwangilewis205@gmail.com</a> while I try to get back online!`;
        }
    });

    function appendMessage(sender, text) {
        const msg = document.createElement('div');
        const isUser = sender.toUpperCase() === 'USER';
        msg.className = `oracle-msg ${isUser ? 'USER' : 'AI'}`;
        msg.innerHTML = formatAIResponse(text);
        oracleOutput.appendChild(msg);
        oracleOutput.scrollTop = oracleOutput.scrollHeight;
        return msg;
    }

    function formatAIResponse(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
    }
});
