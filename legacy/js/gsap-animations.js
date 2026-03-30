// gsap-animations.js

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Sync Lenis with GSAP ScrollTrigger
    if (window.lenis) {
        window.lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            window.lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0, 0);
    }

    // 1. Hero Text Scramble Effect
    const headline = document.getElementById('hero-headline');
    if (headline) {
        const originalText = headline.textContent;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
        
        let frame = 0;
        let iteration = 0;
        let scrambleFrame;
        const scrambleAnimation = () => {
            let textArray = originalText.split("");
            
            let displayString = textArray.map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                if (letter === " ") return " ";
                return chars[Math.floor(Math.random() * chars.length)];
            }).join("");
            
            headline.textContent = displayString;
            
            if (iteration >= originalText.length) {
                cancelAnimationFrame(scrambleFrame);
                return;
            }
            
            iteration += 1.5; // Faster iteration for V20 professional speed
            scrambleFrame = requestAnimationFrame(scrambleAnimation);
        };
        
        setTimeout(() => {
            scrambleAnimation();
        }, 500);
    }

    // 2. Services Boot-up Reveals
    const serviceRows = gsap.utils.toArray('.service-row');
    serviceRows.forEach(row => {
        const specs = row.querySelectorAll('.terminal-item');
        if (specs.length > 0) {
            gsap.from(specs, {
                scrollTrigger: {
                    trigger: row,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                x: -20,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    });

    // Enhanced Section Reveals (Blur-to-Clear)
    const headings = gsap.utils.toArray('h1, h2, .section-title');
    headings.forEach(heading => {
        gsap.fromTo(heading, 
            { opacity: 0, filter: "blur(12px)", y: 20 },
            {
                scrollTrigger: {
                    trigger: heading,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration: 1.2,
                ease: "power4.out" // V21 Professional Damping
            }
        );
    });

    // Horizontal Scroll Trigger for Home Page
    const horizontalContainer = document.querySelector('.hl-scroll');
    if (horizontalContainer) {
        gsap.to(horizontalContainer, {
            x: () => -(horizontalContainer.scrollWidth - window.innerWidth + 100),
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-scroll-wrapper",
                start: "center center",
                end: () => "+=" + horizontalContainer.scrollWidth,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
    }

    // Enterprise Trust Bar Animation
    const trustBar = document.querySelector('.trust-bar-track');
    if (trustBar) {
        const clone = trustBar.innerHTML;
        trustBar.innerHTML += clone + clone;
        gsap.to(trustBar, { x: "-33.33%", duration: 20, repeat: -1, ease: "none" });
    }

});
