// Übersetzungen
const translations = {
    de: {
        welcome_title: "Willkommen auf unserer Homepage",
        welcome_message: "Die Webseite befindet sich noch in Entwicklung.",
        // Header
        header_products: "Angebot",
        header_prices: "Preise",
        header_help: "Hilfe",
        header_about: "Über uns",
        header_current_language: "DE",
        header_contact: "Kontakt",
        header_platform: "Plattform",
        // Footer
        footer_desc: "Bla Bla Bla",
        footer_title_products: "Produkte",
        footer_title_company: "Unternehmen",
        footer_title_contact: "Kontakt",
        footer_link_services: "Angebot",
        footer_link_prices: "Preise",
        footer_link_about: "Über uns",
        footer_link_form: "Kontaktformular",
        footer_bottom_draft: "© 2026 AIMS Rüfenacht Services, Diepflingen — Entwurf"
    },
    en: {
        welcome_title: "Welcome to our Homepage",
        welcome_message: "This website is still under construction.",
        // Header
        header_products: "Products",
        header_prices: "Prices",
        header_help: "Help",
        header_about: "About us",
        header_current_language: "EN",
        header_contact: "Contact",
        header_platform: "Platform",
        // Footer
        footer_desc: "Bla Bla Bla",
        footer_title_products: "Products",
        footer_title_company: "Company",
        footer_title_contact: "Contact",
        footer_link_services: "Products",
        footer_link_prices: "Prices",
        footer_link_about: "About us",
        footer_link_form: "Contact Form",
        footer_bottom_draft: "© 2026 AIMS Rüfenacht Services, Diepflingen — Draft"
    }
};

let currentLang = 'de';

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);

    const rootHtml = document.getElementById('html-root') || document.documentElement;
    if (rootHtml) rootHtml.setAttribute('lang', lang);

    // KORREKTUR: Sucht jetzt nach data-i18n passend zu deinem HTML
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

function getRootPrefix() {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    if (depth <= 1) return './'; 
    return '../'.repeat(depth - 1); 
}

async function loadHeaderAndInit() {
    const headerContainer = document.getElementById('global-header');
    const footerContainer = document.getElementById('global-footer');
    
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.startsWith('en') ? 'en' : 'de';
    currentLang = savedLang || browserLang || 'de';

    // WICHTIG: Wenn du HTML dynamisch nachlädst, überschreibe nicht den Container selbst, 
    // sondern fülle seinen Inhalt, um IDs/Klassen auf dem Wrapper zu erhalten.
    if (headerContainer) {
        try {
            const prefix = getRootPrefix();
            const response = await fetch(`${prefix}header.html`);
            headerContainer.innerHTML = await response.text();
        } catch (error) {
            console.error("Error loading the header template:", error);
        }
    }
    
    if (footerContainer) {
        try {
            const prefix = getRootPrefix();
            const response = await fetch(`${prefix}footer.html`);
            footerContainer.innerHTML = await response.text();
        } catch (error) {
            console.error("Error loading the footer template:", error);
        }
    }
    
    switchLanguage(currentLang);
}

// Initialisierung beim Laden der Seite
window.addEventListener('DOMContentLoaded', loadHeaderAndInit);

document.addEventListener('DOMContentLoaded', () => {
  const burgerToggle = document.getElementById('burgerToggle');
  const navLinks = document.getElementById('navLinks');
  const header = document.getElementById('global-header');

  // Schaltet das mobile Menü ein/aus basierend auf deinem CSS (.nav-links.open)
  if (burgerToggle && navLinks) {
    burgerToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burgerToggle.classList.toggle('open');
    });
  }

  // Aktiviert deinen CSS-Schattenwurf (.scrolled) beim Runterscrollen
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});

