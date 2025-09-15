class BurgerMenu {
    constructor() {
        this.burgerIcon = document.getElementById('burgerIcon');
        this.burgerMenu = document.getElementById('burgerMenu');
        this.overlay = document.getElementById('overlay');
        this.menuItems = document.querySelectorAll('.burger-menu-item');
        this.sections = document.querySelectorAll('.section');
        
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        // Prüfen ob alle Elemente existieren
        if (!this.burgerIcon || !this.burgerMenu || !this.overlay) {
            console.error('BurgerMenu: Benötigte HTML-Elemente nicht gefunden');
            return;
        }

        this.burgerIcon.addEventListener('click', () => this.toggleMenu());
        
        // Event Listener für Overlay (schließt das Menu)
        this.overlay.addEventListener('click', () => this.closeMenu());
        
        // Event Listener für Menu Items
        this.menuItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleMenuItemClick(e));
        });
        
        // ESC Taste zum Schließen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.burgerMenu.classList.add('active');
        this.overlay.classList.add('active');
        this.burgerIcon.classList.add('menu-open');
        this.isMenuOpen = true;
        
        // Verhindert Scrollen im Hintergrund
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.burgerMenu.classList.remove('active');
        this.overlay.classList.remove('active');
        this.burgerIcon.classList.remove('menu-open');
        this.isMenuOpen = false;
        
        // Erlaubt wieder Scrollen
        document.body.style.overflow = '';
    }

    handleMenuItemClick(e) {
        e.preventDefault();
        
        const targetSection = e.target.getAttribute('data-section');
        
        if (!targetSection) {
            console.error('BurgerMenu: data-section Attribut fehlt');
            return;
        }
        
        // Alle Sections ausblenden
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Gewählte Section anzeigen
        const activeSection = document.getElementById(targetSection);
        if (activeSection) {
            activeSection.classList.add('active');
            console.log('Section gewechselt zu:', targetSection);
        } else {
            console.error('Section nicht gefunden:', targetSection);
        }
        
        // Menu schließen
        this.closeMenu();
        
        // Optional: Smooth scroll zur Section
        if (activeSection) {
            activeSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Burgermenu initialisieren wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', () => {
    console.log('BurgerMenu wird initialisiert...');
    new BurgerMenu();
});