// Übersetzungen
const translations = {
    de: {
        // Root-Level Übersetzungen
        welcome_title: "Willkommen auf unserer Homepage",
        welcome_message: "Die Webseite befindet sich noch in Entwicklung.",
        // Header-Level Übersetzungen
        header_home: "Startseite",
        header_contact: "Kontakt",
        header_products: "Angebot",
        // AIMS_Business_Manager Übersetzungen
        AIMS_Business_Manager_Title: "AIMS Business Manager",
        // AIMS_Finance Übersetzungen
        AIMS_Finance_Title: "AIMS Finance",
    },
    en: {
        // Root-Level Übersetzungen
        welcome_title: "Welcome to our Homepage",
        welcome_message: "This website is still under construction.",
        header_home: "Home",
        // Header-Level Übersetztungen
        header_contact: "Contact",
        header_products: "Products",
        // AIMS_Business_Manager Übersetzungen
        AIMS_Business_Manager_Title: "AIMS Business Manager",
        // AIMS_Finance Übersetzungen
        AIMS_Finance_Title: "AIMS Finance",
    }
};

// Globale Variable für die aktuell aktive Sprache
let currentLang = 'de';

// Sprache umschalten und DOM aktualisieren
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);

    const rootHtml = document.getElementById('html-root');
    if (rootHtml) rootHtml.setAttribute('lang', lang);

    // Übersetzt bestehende Elemente + dynamisch nachgeladene Elemente
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Hilfsfunktion: Berechnet den relativen Pfad zur Root-Ebene
function getRootPrefix() {
    // Zählt, wie viele Unterordner im aktuellen Pfad existieren
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    
    // Wenn wir auf einem lokalen Server (z.B. Live Server) testen, 
    // ignorieren wir oft den ersten Ordnernamen (Projektordner).
    // Falls es im Unterordner nicht klappt, passe die "depth" an.
    
    if (depth <= 1) return './'; // Root-Ebene (z.B. index.html)
    return '../'.repeat(depth - 1); // Für Unterordner (z.B. '../../')
}

// Header laden und DANACH Übersetzung starten
async function loadHeaderAndInit() {
    const headerContainer = document.getElementById('global-header');
    
    // 1. Sprache ermitteln vor dem Laden
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.startsWith('en') ? 'en' : 'de';
    const defaultLang = savedLang || browserLang || 'de';
    currentLang = defaultLang;

    // 2. Header asynchron holen mit dynamischem Pfad prefix
    if (headerContainer) {
        try {
            const prefix = getRootPrefix();
            // Erzeugt automatisch z.B. '../../header.html'
            const response = await fetch(`${prefix}header.html`); 
            const htmlContent = await response.text();
            
            // Header ins DOM einfügen
            headerContainer.innerHTML = htmlContent;
        } catch (error) {
            console.error("Error loading the header template:", error);
        }
    }

    // 3. Erst jetzt, wo alles im DOM steht, die Sprache anwenden
    switchLanguage(currentLang);
}

// Initialisierung beim Laden der Seite
window.addEventListener('DOMContentLoaded', loadHeaderAndInit);
