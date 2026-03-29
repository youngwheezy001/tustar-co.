document.addEventListener('DOMContentLoaded', () => {

    // 1. Elite Liquid Page Transitions, Preloader & Canvas sequence
    const preloader = document.getElementById('cinematic-preloader');
    const loaderText = document.querySelector('.loader-text');
    const loaderFill = document.querySelector('.loader-progress-fill');
    const preloaderProgress = document.querySelector('.loader-percentage');
    const transitionWipe = document.getElementById('transition-wipe');

    // Canvas Engine Logic
    const canvas = document.getElementById('hero-sequence-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const frameCount = 111;
    const images = [];
    const imageSeq = { frame: 0 };
    let canvasLoaded = false;

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        renderCanvas();
    }
    window.addEventListener('resize', resizeCanvas);

    function renderCanvas() {
        if (!ctx || !images[imageSeq.frame]) return;
        const img = images[imageSeq.frame];
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    if (sessionStorage.getItem('tustar_transitioning') === 'true') {
        if(preloader) preloader.style.display = 'none';
        gsap.set(transitionWipe, { y: "-100vh" });
        gsap.to(transitionWipe, { y: "-200vh", duration: 0.8, ease: "power4.inOut", delay: 0.1 });
        sessionStorage.removeItem('tustar_transitioning');
        setTimeout(() => { document.body.classList.add('page-entered'); }, 100);
        
        // Quietly load frames if canvas exists
        if (canvas) {
            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                img.src = `assets/sequence/scene${String(i).padStart(5, '0')}.jpg`;
                images.push(img);
                if(i===1) img.onload = () => { resizeCanvas(); canvasLoaded = true; };
            }
        }
    } else {
        if (preloader && !sessionStorage.getItem('tustar_preloaded')) {
            document.body.style.overflow = "hidden";
            let loadedCount = 0;
            
            // V37 Industrial Drone Orbit Animation & Telemetry
            const drone = preloader.querySelector('.industrial-drone');
            const telemetry = document.getElementById('loader-telemetry');
            const loaderLabel = preloader.querySelector('.loader-label');
            const telemetryLines = [
                "[OK] SYSTEM_CORE_BOOT",
                "[OK] BIOMETRIC_SCAN_COMPLETE",
                "[OK] NETWORK_GRID_ACTIVE",
                "[OK] CACHE_ASSETS_VERIFIED",
                "[OK] GPU_ACCELERATION_STABLE",
                "[OK] NEURAL_LINK_ESTABLISHED",
                "[OK] VIRTUAL_DOM_SYNERGY",
                "[OK] PROTOCOL_V37_ONLINE"
            ];
            
            let telIdx = 0;
            const telInterval = setInterval(() => {
                const line = document.createElement('div');
                line.innerText = telemetryLines[telIdx % telemetryLines.length];
                telemetry.appendChild(line);
                telemetry.scrollTop = telemetry.scrollHeight;
                telIdx++;
            }, 150);

            // 3D Perspective Orbit Logic
            const orbitObj = { angle: 0 };
            gsap.to(orbitObj, {
                angle: Math.PI * 2,
                duration: 4,
                repeat: -1,
                ease: "none",
                onUpdate: () => {
                    const x = Math.cos(orbitObj.angle) * 180; // Ellipse width
                    const z = Math.sin(orbitObj.angle) * 80;  // Depth
                    const y = Math.sin(orbitObj.angle) * 30;  // Vert oscillation
                    
                    const scale = (z + 200) / 200; // perspective scale
                    const opacity = (z + 100) / 200 + 0.5;
                    
                    gsap.set(drone, {
                        x: x,
                        y: y,
                        z: z,
                        scale: scale,
                        opacity: opacity,
                        zIndex: z > 0 ? 10 : 1
                    });
                }
            });

            function completeLoader() {
                clearInterval(telInterval);
                sessionStorage.setItem('tustar_preloaded', 'true');
                gsap.to(preloader.querySelector('.loader-content'), { opacity: 0, duration: 0.4 });
                
                // Audio Engine: Cinematic Startup Chime
                if (window.AudioContext || window.webkitAudioContext) {
                    try {
                        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                        if (audioCtx.state === 'suspended') audioCtx.resume();
                        let osc = audioCtx.createOscillator();
                        let gainNode = audioCtx.createGain();
                        osc.type = 'sawtooth';
                        osc.frequency.setValueAtTime(40, audioCtx.currentTime);
                        osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 2.0);
                        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
                        gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.1);
                        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.0);
                        osc.connect(gainNode);
                        gainNode.connect(audioCtx.destination);
                        osc.start(); osc.stop(audioCtx.currentTime + 3.0);
                    } catch(e) {}
                }

                setTimeout(() => {
                    document.body.classList.add('page-entered');
                    document.body.style.overflow = "";
                    setTimeout(() => { preloader.style.display = 'none'; }, 1000);
                }, 400);
            }

            function updateLoaderUI(p) {
                if (preloaderProgress) preloaderProgress.innerText = p.toString().padStart(2, '0') + "%"; 
                if (loaderLabel) {
                    if (p > 30) loaderLabel.innerText = "VERIFYING_INFRASTRUCTURE...";
                    if (p > 60) loaderLabel.innerText = "OPTIMIZING_VFX_PIPELINE...";
                    if (p > 90) loaderLabel.innerText = "ESTABLISHING_COMMAND_LINK...";
                }
            }

            if (canvas) {
                // Buffer sequence
                for (let i = 1; i <= frameCount; i++) {
                    const img = new Image();
                    img.src = `assets/sequence/scene${String(i).padStart(5, '0')}.jpg`;
                    img.onload = () => {
                        loadedCount++;
                        let p = Math.round((loadedCount / frameCount) * 100);
                        updateLoaderUI(p);
                        if (loadedCount === 1) { resizeCanvas(); canvasLoaded = true; }
                        if (loadedCount === frameCount) setTimeout(completeLoader, 500);
                    };
                    images.push(img);
                }
            } else {
                // Fake gsaps load for pages without Canvas
                let progress = { val: 0 };
                gsap.to(progress, {
                    val: 100, duration: 1.5, ease: "power2.inOut",
                    onUpdate: () => updateLoaderUI(Math.round(progress.val)),
                    onComplete: completeLoader
                });
            }
        } else {
            if(preloader) preloader.style.display = 'none';
            document.body.classList.add('page-entered');
            
            // Instant load fallback
            if (canvas) {
                for (let i = 1; i <= frameCount; i++) {
                     const img = new Image();
                     img.src = `assets/sequence/scene${String(i).padStart(5, '0')}.jpg`;
                     images.push(img);
                     if(i===1) img.onload = () => { resizeCanvas(); canvasLoaded = true; };
                }
            }
        }
    }

    // --- V32 MOTION ENGINE: THE 'TONY' RESTORATION & PHASE SCRUB ---

    // 1. Hub Engine (Home/Drone)
    if (canvas && document.getElementById('hero')) {
        let checkExist = setInterval(() => {
            if (canvasLoaded) {
                clearInterval(checkExist);
                
                // Master Scrub (111 Frames)
                gsap.timeline({ 
                    scrollTrigger: { 
                        trigger: "#hero", start: "top top", end: "bottom bottom", scrub: 0.8 
                    } 
                }).to(imageSeq, {
                    frame: frameCount - 1, snap: "frame", ease: "none", onUpdate: renderCanvas
                });

                // Phase Scrub Logic (4 Stages + Main Title)
                const hubStages = [
                    { id: '#hero-main-title', in: 0, out: 0.15, type: 'start' },
                    { id: '#stage-1', in: 0.20, out: 0.35 },
                    { id: '#stage-2', in: 0.40, out: 0.55 },
                    { id: '#stage-3', in: 0.60, out: 0.75 },
                    { id: '#stage-4', in: 0.80, out: 0.95, type: 'end' }
                ];

                hubStages.forEach((s) => {
                    const el = document.querySelector(s.id);
                    if (!el) return;

                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: "#hero",
                            start: `top+=${s.in * 100}% top`,
                            end: `top+=${s.out * 100}% top`,
                            scrub: 1
                        }
                    });

                    if (s.type === 'start') {
                        tl.to(el, { opacity: 0, scale: 0.9, y: -50, ease: "power2.in" });
                    } else if (s.type === 'end') {
                        tl.fromTo(el, { opacity: 0, y: 50, display: "flex" }, { opacity: 1, y: 0, ease: "power2.out" });
                    } else {
                        tl.fromTo(el, { opacity: 0, y: 50, display: "flex" }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
                          .to(el, { opacity: 0, y: -50, duration: 0.4, ease: "power2.in" }, "+=0.2");
                    }
                });
            }
        }, 100);
    }

    // 2. Archive Engine (Projects/Sequence2)
    const projectsCanvas = document.getElementById('projects-sequence-canvas');
    if (projectsCanvas) {
        const pCtx = projectsCanvas.getContext('2d');
        const pFrameCount = 41;
        const pImages = [];
        const pImageSeq = { frame: 0 };
        let pLoadedCount = 0;

        function renderProjectsCanvas() {
            if (!pCtx || !pImages[pImageSeq.frame]) return;
            const img = pImages[pImageSeq.frame];
            const scale = Math.max(projectsCanvas.width / img.width, projectsCanvas.height / img.height);
            const x = (projectsCanvas.width / 2) - (img.width / 2) * scale;
            const y = (projectsCanvas.height / 2) - (img.height / 2) * scale;
            pCtx.clearRect(0, 0, projectsCanvas.width, projectsCanvas.height);
            pCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }

        function resizeProjectsCanvas() {
            projectsCanvas.width = window.innerWidth * window.devicePixelRatio;
            projectsCanvas.height = window.innerHeight * window.devicePixelRatio;
            renderProjectsCanvas();
        }
        window.addEventListener('resize', resizeProjectsCanvas);

        for (let i = 1; i <= pFrameCount; i++) {
            const img = new Image();
            img.src = `assets/sequence2/scene${String(i).padStart(5, '0')}.jpg`;
            img.onload = () => {
                pLoadedCount++;
                if (pLoadedCount === 1) resizeProjectsCanvas();
                if (pLoadedCount === pFrameCount) {
                    // Sequence Scrub
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: "#projects-hero", start: "top top", end: "bottom bottom", scrub: 0.8
                        }
                    }).to(pImageSeq, {
                        frame: pFrameCount - 1, snap: "frame", ease: "none", onUpdate: renderProjectsCanvas
                    });

                    // 4-Stage Text Reveal (V33)
                    const pStages = [
                        { id: '#projects-main-title', in: 0, out: 0.15, type: 'start' },
                        { id: '#projects-stage-1', in: 0.2, out: 0.35 },
                        { id: '#projects-stage-2', in: 0.4, out: 0.55 },
                        { id: '#projects-stage-3', in: 0.6, out: 0.75 },
                        { id: '#projects-stage-4', in: 0.8, out: 0.95, type: 'end' }
                    ];

                    pStages.forEach((s) => {
                        const el = document.querySelector(s.id);
                        if (!el) return;
                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: "#projects-hero",
                                start: `top+=${s.in * 100}% top`,
                                end: `top+=${s.out * 100}% top`,
                                scrub: 1
                            }
                        });
                        
                        if (s.type === 'start') {
                            tl.to(el, { opacity: 0, scale: 0.9, y: -50, ease: "power2.in" });
                        } else if (s.type === 'end') {
                            tl.fromTo(el, { opacity: 0, y: 50, display: "flex" }, { opacity: 1, y: 0, ease: "power2.out" });
                        } else {
                            tl.fromTo(el, { opacity: 0, y: 50, display: "flex" }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
                              .to(el, { opacity: 0, y: -50, duration: 0.4, ease: "power2.in" }, "+=0.2");
                        }
                    });
                }
            };
            pImages.push(img);
        }
    }

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const trg = link.getAttribute('href');
            if (trg && (trg.endsWith('.html') || !trg.includes('#')) && link.target !== '_blank') {
                e.preventDefault();
                sessionStorage.setItem('tustar_transitioning', 'true');
                gsap.to(transitionWipe, {
                    y: "-100vh", duration: 0.5, ease: "power3.inOut",
                    onComplete: () => { window.location.href = trg; }
                });
            }
        });
    });

    // 2. Hover Tilt Effect for specific cards (excluding static forms)
    const tiltCards = document.querySelectorAll('.tilt-card:not(.static-form)');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (centerY - y) / 45; // Refined for V19 Professional Stability
            const tiltY = (x - centerX) / 45;
            
            gsap.to(card, {
                rotationX: tiltX,
                rotationY: tiltY,
                transformPerspective: 1000,
                ease: "power1.out",
                duration: 0.5
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                ease: "power2.out",
                duration: 0.7
            });
        });
    });

    // 2.1 Cinematic Zoom Logic for Heroes
    const cinematicImgs = document.querySelectorAll('.cinematic-img');
    cinematicImgs.forEach(img => {
        gsap.to(img, {
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top center",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 3. Initialize Lenis (Smooth Scrolling)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        lerp: 0.1
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenis = lenis;

    // 4. Sticky Navbar Logic
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Nav active link highlighting
    const currentLoc = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentLoc) {
            link.classList.add('active');
        }
    });

    // 5. Project Filters logic (projects.html)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        gsap.to(card, { autoAlpha: 1, scale: 1, display: "block", duration: 0.3 });
                    } else {
                        gsap.to(card, { autoAlpha: 0, scale: 0.9, display: "none", duration: 0.3 });
                    }
                });
                
                if (window.ScrollTrigger) {
                    setTimeout(() => ScrollTrigger.refresh(), 400);
                }
            });
        });
    }

    // ---- High-Fidelity Additions ----

    const masonryMatrix = document.querySelector('.masonry-matrix');
    if (masonryMatrix) {
        gsap.from('.project-card', {
            opacity: 0,
            y: 60,
            stagger: 0.1,
            duration: 1.2,
            scrollTrigger: {
                trigger: ".masonry-matrix",
                start: "top 95%",
            }
        });
    }

    // System Cursor
    const cursor = document.getElementById('system-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        const interactables = document.querySelectorAll('a, button, input, textarea, .tilt-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // Scroll Progress
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const percent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = percent + '%';
        });
    }

    // FPS Counter
    const fpsElement = document.getElementById('fps-counter');
    if (fpsElement) {
        let lastTime = performance.now();
        let frames = 0;
        const calcFPS = () => {
            const now = performance.now();
            frames++;
            if (now >= lastTime + 1000) {
                fpsElement.textContent = `FPS: ${Math.round((frames * 1000) / (now - lastTime))}`;
                frames = 0;
                lastTime = now;
            }
            requestAnimationFrame(calcFPS);
        };
        requestAnimationFrame(calcFPS);
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Elite Feature: Procedural Micro-Audio
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;
    function playClickSound() {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }

    // Elite Feature: Magnetic Buttons & Hover Clicks
    const magneticElements = document.querySelectorAll('.button, .glitch-btn, .nav-links a');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power3.out" });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power4.out" });
        });
        el.addEventListener('mouseenter', playClickSound);
    });

    document.querySelectorAll('.nav-links a, .tilt-card').forEach(el => {
        el.addEventListener('mouseenter', playClickSound);
    });

    // Elite Feature: Interactive Hover Videos
    document.querySelectorAll('.project-placeholder').forEach(placeholder => {
        const video = document.createElement('video');
        video.src = "https://www.w3schools.com/html/mov_bbb.mp4";
        video.className = "hover-video";
        video.loop = true; video.muted = true; video.playsInline = true;
        placeholder.appendChild(video);
        
        const card = placeholder.closest('.tilt-card');
        if (card) {
            card.addEventListener('mouseenter', () => video.play().catch(e=>e));
            card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
        }
    });

    // V22 Deep Dive & Dossier Architecture
    const deepDiveLinks = document.querySelectorAll('[data-deep-dive]');
    deepDiveLinks.forEach(link => {
        link.style.cursor = 'pointer';
        link.addEventListener('click', (e) => {
            const url = link.getAttribute('data-deep-dive');
            if (!url) return;
            
            // Premium Transition Audio/Visual
            playClickSound();
            const overlay = document.getElementById('transition-wipe');
            gsap.to(overlay, { 
                scaleY: 1, 
                duration: 0.8, 
                ease: "power4.inOut", 
                onComplete: () => { window.location.href = url; } 
            });
        });
    });

    // Elite Feature: 3D WebGL Hero (Three.js Ethereal Mesh)
    const webglContainer = document.getElementById('webgl-container');
    if (webglContainer && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        webglContainer.appendChild(renderer.domElement);

        // V21 Ethereal Wire 2.0 Construction (Blueprint Matrix)
        const group = new THREE.Group();
        scene.add(group);

        const geo = new THREE.IcosahedronGeometry(2, 2); 
        
        // 1. Point Cloud (Subtle Cyan)
        const pointsMat = new THREE.PointsMaterial({ color: 0x00E5FF, size: 0.04, transparent: true, opacity: 0.3 });
        const pointCloud = new THREE.Points(geo, pointsMat);
        group.add(pointCloud);

        // 2. Blueprint Lines (Cyan Pulse)
        const lineGeo = new THREE.WireframeGeometry(geo);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.15 });
        const lines = new THREE.LineSegments(lineGeo, lineMat);
        group.add(lines);

        camera.position.z = 5;

        let mouseX = 0; let mouseY = 0;
        let targetX = 0; let targetY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        const animate = function () {
            requestAnimationFrame(animate);
            
            // Strategic Damped Tracking
            targetX += (mouseX - targetX) * 0.025;
            targetY += (mouseY - targetY) * 0.025;
            
            group.rotation.y += 0.0012; 
            group.rotation.x += 0.0004;
            
            // V21 Data Pulse Glow
            const pulse = 0.15 + Math.sin(Date.now() * 0.002) * 0.05;
            lineMat.opacity = pulse;
            
            group.position.x = targetX * 1.0;
            group.position.y = targetY * 1.0;
            
            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // 6. Global Component Injector (Footer & Socials)
    function bindFooterMagneticLogic() {
        const magBtns = document.querySelectorAll('.dynamic-magnetic-btn');
        magBtns.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(el, { x: x * 0.5, y: y * 0.5, duration: 0.3, ease: 'power2.out' });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
            });
        });
    }

    // Inject Socials Sidebar
    const socialsContainer = document.createElement('div');
    socialsContainer.id = 'global-socials-injector';
    document.body.appendChild(socialsContainer);

    fetch('components/socials.html')
        .then(resp => resp.text())
        .then(html => {
            socialsContainer.innerHTML = html;
        })
        .catch(err => console.error('Socials Injection Failure:', err));

    const globalFooter = document.getElementById('global-footer-container');
    if (globalFooter) {
        fetch('components/footer.html')
            .then(resp => resp.text())
            .then(html => {
                globalFooter.innerHTML = html;
                bindFooterMagneticLogic();
            })
            .catch(err => console.error('Failed to inject global footer:', err));
    }

    // High-Fidelity Reveal for About Page
    if (document.querySelector('.dossier-wrapper')) {
        gsap.from('.dossier-wrapper > div', {
            opacity: 0,
            x: -50,
            stagger: 0.2,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: ".dossier-wrapper",
                start: "top 80%"
            }
        });
        
        gsap.from('.massive-grid > div, .tilt-card', {
            opacity: 0,
            y: 40,
            stagger: 0.1,
            duration: 1,
            scrollTrigger: {
                trigger: ".massive-grid, .tilt-card",
                start: "top 90%"
            }
        });
    }

    // High-Fidelity Reveal for Service Matrix (Suite)
    const serviceMatrix = document.querySelector('.hq-section + section');
    if (serviceMatrix && document.body.contains(serviceMatrix)) {
        gsap.from('.project-card', {
            opacity: 0,
            y: 60,
            stagger: 0.15,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: serviceMatrix,
                start: "top 80%"
            }
        });
    }

    // High-Fidelity Reveal for The Command (Contact)
    if (document.querySelector('.command-grid-wrapper')) {
        gsap.from('.terminal-box', {
            opacity: 0,
            x: -30,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
                trigger: ".terminal-box",
                start: "top 85%"
            }
        });

        gsap.from('.command-grid-wrapper > div:last-child > div', {
            opacity: 0,
            x: 30,
            stagger: 0.2,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
                trigger: ".command-grid-wrapper",
                start: "top 85%"
            }
        });

        // Terminal Interaction Logic
        const commandForm = document.getElementById('command-form');
        const feedback = document.getElementById('terminal-feedback');
        if (commandForm) {
            commandForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = commandForm.querySelector('button');
                btn.innerText = "[ TRANSMITTING... ]";
                btn.style.opacity = "0.5";
                btn.style.pointerEvents = "none";
                feedback.style.display = "block";
                
                setTimeout(() => {
                    feedback.innerText = "> PROTOCOL_RECEIVED. SECURE_LINK_ESTABLISHED.";
                    feedback.style.color = "var(--accent-color)";
                    btn.innerText = "[ TRANSMISSION_COMPLETE ]";
                }, 2500);
            });
        }
    }

});
