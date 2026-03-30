// Localization Dictionary Framework
const dictionary = {
    "en": {
        "nav-hub": "HOME",
        "nav-lab": "ABOUT",
        "nav-suite": "SERVICES",
        "nav-archives": "PROJECTS",
        "nav-command": "CONTACT",
        "cs-tag": "// PROJECT BRIEF",
        "cs-title": "CityGrub UX Restructure",
        "cs-role": "Web Arch / UX",
        "cs-blueprint": "The Blueprint",
        "cs-p1": "CityGrub came to us with a bloated architecture. Their React app was suffering from extreme re-rendering waterfalls and a 6.2-second Time to Interactive (TTI).",
        "cs-p2": "Our directive was simple: dismantle the monolithic state tree, refactor into isolated micro-frontends, and redesign the cart user flow to minimize friction.",
        "cs-deploy": "The Deployment Payload",
        "cs-roi-tag": "// COMMERCIAL IMPACT",
        "cs-roi-title": "We dropped their TTI to 0.8s and boosted conversion by 34%.",
        "cs-stat1": "FINAL TTI",
        "cs-stat2": "CONVERSION RATE",
        "cs-stat3": "DROPPED FRAMES",
        "cs-btn": "[ INITIATE SIMILAR LINK ]"
    },
    "fr": {
        "nav-hub": "ACCUEIL",
        "nav-lab": "À PROPOS",
        "nav-suite": "SERVICES",
        "nav-archives": "PROJETS",
        "nav-command": "CONTACT",
        "cs-tag": "// RÉSUMÉ DU PROJET",
        "cs-title": "Restructuration UX CityGrub",
        "cs-role": "Arch. Web / UX",
        "cs-blueprint": "Le Schéma Directeur",
        "cs-p1": "CityGrub est venu nous voir avec une architecture surchargée. Leur application React souffrait de cascades de re-rendus extrêmes et d'un TTI de 6,2 secondes.",
        "cs-p2": "Notre directive était simple : démanteler l'arbre d'état, refondre l'architecture en micro-frontends isolés, et reconcevoir le flux utilisateur pour minimiser la friction.",
        "cs-deploy": "Le Déploiement",
        "cs-roi-tag": "// IMPACT COMMERCIAL",
        "cs-roi-title": "Nous avons réduit leur TTI à 0,8s et augmenté la conversion de 34%.",
        "cs-stat1": "TTI FINAL",
        "cs-stat2": "TAUX DE CONVERSION",
        "cs-stat3": "IMAGES PERDUES",
        "cs-btn": "[ INITIER UN LIEN SIMILAIRE ]"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langToggles = document.querySelectorAll('.lang-toggle');
    const translatableElements = document.querySelectorAll('[data-i18n]');

    function setLanguage(lang) {
        sessionStorage.setItem('tustar_lang', lang);
        
        // Update styling instantly
        langToggles.forEach(t => {
            if (t.dataset.lang === lang) {
                t.style.color = 'var(--accent-color)';
            } else {
                t.style.color = 'var(--text-primary)';
            }
        });

        // Translate specific data-i18n tags globally
        translatableElements.forEach(el => {
            const key = el.dataset.i18n;
            if (dictionary[lang] && dictionary[lang][key]) {
                // simple fade transition
                el.style.opacity = 0;
                setTimeout(() => {
                    el.innerHTML = dictionary[lang][key];
                    el.style.opacity = 1;
                }, 200);
            }
        });
        
        // Translate navs uniformly across all 5 files ensuring absolute consistency
        document.querySelectorAll('.nav-links a').forEach(a => {
            if(a.href.includes('index.html')) a.innerText = dictionary[lang]['nav-hub'];
            if(a.href.includes('about.html')) a.innerText = dictionary[lang]['nav-lab'];
            if(a.href.includes('services.html')) a.innerText = dictionary[lang]['nav-suite'];
            if(a.href.includes('projects.html')) a.innerText = dictionary[lang]['nav-archives'];
            if(a.href.includes('contact.html')) a.innerText = dictionary[lang]['nav-command'];
        });
    }

    const currentLang = sessionStorage.getItem('tustar_lang') || 'en';
    setLanguage(currentLang);

    langToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            setLanguage(e.target.dataset.lang);
        });
    });
});
