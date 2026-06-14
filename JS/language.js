// Übersetzungen
const translations = {
    de: {
        welcome_title: "Willkommen auf unserer Homepage",
        welcome_message: "Die Webseite befindet sich noch in Entwicklung.",
        header_contact: "Kontakt",
        header_products: "Angebot"
    },
    en: {
        welcome_title: "Welcome to our Homepage",
        welcome_message: "This website is still under construction.",
        header_contact: "Contact",
        header_products: "Products"
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

    // Übersetzt jetzt bestehende Elemente + dynamisch nachgeladene Elemente
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Header laden und DANACH Übersetzung starten
async function loadHeaderAndInit() {
    const headerContainer = document.getElementById('global-header');
    
    // 1. Sprache ermitteln vor dem Laden
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.startsWith('en') ? 'en' : 'de';
    const defaultLang = savedLang || browserLang || 'de';
    currentLang = defaultLang;

    // 2. Header asynchron holen
    if (headerContainer) {
        try {
            // Wichtig: Pfad ggf. anpassen (z.B. 'header.html' oder '/header.html')
            const response = await fetch('header.html'); 
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
