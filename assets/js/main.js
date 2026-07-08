// Shared JavaScript for Amul Kool Café

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Drawer Toggle
    setupMobileMenu();

    // 2. Scroll-active Navbar styling
    setupNavbarScroll();

    // 3. Scroll Reveal Animations
    setupScrollReveal();

    // 4. Accordion Toggle Logic
    setupAccordions();

    // 5. Store Locator search selection
    setupStoreLocator();
});

// Mobile menu setup
function setupMobileMenu() {
    const burgerBtn = document.getElementById("mobile-menu-toggle");
    const closeBtn = document.getElementById("mobile-menu-close");
    const drawer = document.getElementById("mobile-menu-drawer");

    if (burgerBtn && drawer) {
        burgerBtn.addEventListener("click", () => {
            drawer.classList.remove("translate-x-full", "pointer-events-none");
            drawer.classList.add("translate-x-0");
            document.body.classList.add("nav-open");
        });
    }

    if (closeBtn && drawer) {
        closeBtn.addEventListener("click", () => {
            drawer.classList.remove("translate-x-0");
            drawer.classList.add("translate-x-full", "pointer-events-none");
            document.body.classList.remove("nav-open");
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll("#mobile-menu-drawer a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            if (drawer) {
                drawer.classList.remove("translate-x-0");
                drawer.classList.add("translate-x-full", "pointer-events-none");
                document.body.classList.remove("nav-open");
            }
        });
    });
}

// Navbar styling on scroll
function setupNavbarScroll() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add("shadow-md", "bg-surface/90", "dark:bg-primary/95", "backdrop-blur-xl");
            navbar.classList.remove("bg-surface/60", "dark:bg-primary/40");
        } else {
            navbar.classList.remove("shadow-md", "bg-surface/90", "dark:bg-primary/95");
            navbar.classList.add("bg-surface/60", "dark:bg-primary/40", "backdrop-blur-2xl");
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial run
}

// Intersection Observer for scroll reveals
function setupScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    reveals.forEach((element) => {
        observer.observe(element);
    });
}

// Accordion Expand/Collapse Logic
function setupAccordions() {
    window.toggleAccordion = function(element) {
        const item = element.parentElement;
        const allItems = document.querySelectorAll('.accordion-item');
        
        allItems.forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
            }
        });
        
        item.classList.toggle('active');
    };
}

// Utility Overlays Handling (404 and Thank You modals)
window.showUtility = function(id) {
    const utilityEl = document.getElementById('utility-' + id);
    const mainNav = document.getElementById('navbar');

    if (utilityEl) {
        utilityEl.classList.remove('hidden');
        utilityEl.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
    if (mainNav) {
        mainNav.style.display = 'none';
    }
};

window.hideUtility = function(id) {
    const utilityEl = document.getElementById(id);
    const mainNav = document.getElementById('navbar');

    if (utilityEl) {
        utilityEl.classList.add('hidden');
        utilityEl.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
    if (mainNav) {
        mainNav.style.display = 'flex';
    }
};

// Store locator search / filtering interaction
function setupStoreLocator() {
    const items = document.querySelectorAll('.locator-item');
    const pin = document.getElementById('map-pin');
    
    items.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active style from all items
            items.forEach(i => i.classList.remove('bg-surface-container-high', 'border-surface-dim'));
            
            // Add active style to selected item
            item.classList.add('bg-surface-container-high', 'border-surface-dim');
            
            // Move pin slightly to simulate a location change
            if (pin) {
                const latOffset = (Math.random() - 0.5) * 40;
                const lngOffset = (Math.random() - 0.5) * 40;
                pin.style.transform = `translate(calc(-50% + ${latOffset}px), calc(-50% + ${lngOffset}px))`;
            }
        });
    });
}
