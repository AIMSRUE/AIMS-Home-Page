document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navCollapse = document.getElementById('navCollapse');

    menuToggle.addEventListener('click', () => {
        // Schaltet Klassen für das Menü und die Hamburger-Animation um
        const isActive = menuToggle.classList.toggle('is-active');
        navCollapse.classList.toggle('is-active');
        
        // Barrierefreiheit aktualisieren
        menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Schliesst das Menü automatisch, wenn ein Link angeklickt wird
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('is-active');
            navCollapse.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
});
