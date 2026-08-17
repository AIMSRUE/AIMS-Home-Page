document.addEventListener("DOMContentLoaded", async () => {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const language = pathParts[0];

    const supportedLanguages = ["de", "en", "fr", "it"];
    const lang = supportedLanguages.includes(language) ? language : "de";

    await loadComponent("global-header", `/${lang}/header.html`);
    await loadComponent("global-footer", `/${lang}/footer.html`);

    bindBurgerMenu();
    bindDropdowns();
});


async function loadComponent(elementId, filePath) {
    const container = document.getElementById(elementId);

    if (!container) {
        return;
    }

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Could not load ${filePath}`);
        }

        const html = await response.text();
        container.innerHTML = html;

    } catch (error) {
        console.error(error);
        container.innerHTML = "";
    }
}


/* =========================================================
   BURGER MENU
   ========================================================= */

function bindBurgerMenu() {
    const burgerToggle = document.getElementById("burgerToggle");
    const navMenu = document.getElementById("navLinks");

    if (!burgerToggle || !navMenu) {
        console.warn("Burger elements not found.");
        return;
    }

    burgerToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        burgerToggle.classList.toggle("toggle-morph");
    });
}


/* =========================================================
   LANGUAGE & LOGIN DROPDOWNS
   ========================================================= */

function bindDropdowns() {
    const langBtn = document.getElementById("langBtn");
    const langDropdown = document.getElementById("langDropdown");

    const loginBtn = document.getElementById("loginBtn");
    const loginDropdown = document.getElementById("loginDropdown");

    if (!langBtn || !langDropdown || !loginBtn || !loginDropdown) {
        console.warn("Dropdown elements not found in header.");
        return;
    }

    // Sprach-Dropdown
    langBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        langDropdown.classList.toggle("show");
        loginDropdown.classList.remove("show");
    });

    // Login-Dropdown
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        loginDropdown.classList.toggle("show");
        langDropdown.classList.remove("show");
    });

    document.addEventListener("pointerdown", (e) => {

        if (
            !langBtn.contains(e.target) &&
            !langDropdown.contains(e.target)
        ) {
            langDropdown.classList.remove("show");
        }

        if (
            !loginBtn.contains(e.target) &&
            !loginDropdown.contains(e.target)
        ) {
            loginDropdown.classList.remove("show");
        }
    });
}


/* =========================================================
   LANGUAGE SWITCHING
   ========================================================= */

function switchLanguage(language) {
    const supportedLanguages = ["de", "en", "fr", "it"];

    if (!supportedLanguages.includes(language)) {
        console.warn(`Unsupported language: ${language}`);
        return;
    }

    const url = new URL(window.location.href);

    const currentPage = url.pathname.replace(/^\/(de|en|fr|it)/, "") || "/index.html";

    /*
     * Übersetzung der Dateinamen
     */
    const translations = {

        de: {
            "/index.html": "/index.html",
            "/produkte.html": "/produkte.html",
            "/preise.html": "/preise.html",
            "/hilfe.html": "/hilfe.html",
            "/über-uns.html": "/über-uns.html",
            "/kontakt.html": "/kontakt.html"
        },

        en: {
            "/index.html": "/index.html",
            "/produkte.html": "/products.html",
            "/preise.html": "/pricing.html",
            "/hilfe.html": "/help.html",
            "/über-uns.html": "/about-us.html",
            "/kontakt.html": "/contact.html"
        },

        fr: {
            "/index.html": "/index.html",
            "/produkte.html": "/produits.html",
            "/preise.html": "/tarifs.html",
            "/hilfe.html": "/aide.html",
            "/über-uns.html": "/a-propos.html",
            "/kontakt.html": "/contact.html"
        },

        it: {
            "/index.html": "/index.html",
            "/produkte.html": "/prodotti.html",
            "/preise.html": "/prezzi.html",
            "/hilfe.html": "/aiuto.html",
            "/über-uns.html": "/chi-siamo.html",
            "/kontakt.html": "/contatti.html"
        }
    };

    const targetPage = translations[language]?.[currentPage] || "/index.html";

    url.pathname = `/${language}${targetPage}`;

    window.location.href = url.toString();
}