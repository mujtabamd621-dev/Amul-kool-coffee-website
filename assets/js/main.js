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

    // 6. Scroll-driven Product Canvas Animation
    setupScrollAnimation();
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

// 6. Scroll-driven Product Canvas Animation
function setupScrollAnimation() {
    const canvas = document.getElementById("product-canvas");
    const container = document.querySelector(".scroll-track-container");
    const preloader = document.getElementById("site-preloader");
    const progressFill = document.querySelector(".progress-bar-fill");
    const progressText = document.querySelector(".progress-bar-text");

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const frameCount = 271;
    const images = [];
    let loadedCount = 0;

    // Generate path for a given frame index
    const currentFrame = index => {
        const frameStr = String(index).padStart(3, '0');
        return `/assets/frames/ezgif-frame-${frameStr}.jpg`;
    };

    // Responsive Canvas Resizing
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        
        // Redraw current frame on resize
        drawFrame(getCurrentFrameIndex());
    }

    // Preload all 271 images
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedCount++;
            const percent = Math.round((loadedCount / frameCount) * 100);
            
            if (progressFill) progressFill.style.width = `${percent}%`;
            if (progressText) progressText.textContent = `LOADING EXPERIENCE: ${percent}%`;

            if (loadedCount === frameCount) {
                // Preloading complete
                setTimeout(() => {
                    if (preloader) {
                        preloader.classList.add("fade-out");
                        // Allow scrolling once loaded
                        document.body.classList.remove("overflow-hidden");
                    }
                }, 400);
                
                resizeCanvas();
                window.addEventListener("resize", resizeCanvas);
                window.addEventListener("scroll", handleScroll);
                // Initial draw
                drawFrame(1);
            }
        };
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
                if (preloader) preloader.classList.add("fade-out");
                resizeCanvas();
            }
        };
        images.push(img);
    }

    // Helper to draw a specific frame index (1-indexed)
    function drawFrame(index) {
        const img = images[index - 1];
        if (!img || !img.complete) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Aspect ratio contain with scaling
        const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, x, y;

        if (imgRatio > canvasRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
        } else {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
        }

        x = (canvasWidth - drawWidth) / 2;
        y = (canvasHeight - drawHeight) / 2;

        ctx.drawImage(img, x, y, drawWidth, drawHeight);
    }

    // Calculate current frame index based on scroll position
    function getCurrentFrameIndex() {
        const rect = container.getBoundingClientRect();
        const scrollHeight = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        
        let scrollFraction = scrolled / scrollHeight;
        if (scrollFraction < 0) scrollFraction = 0;
        if (scrollFraction > 1) scrollFraction = 1;

        // Map scroll fraction (0 to 1) to frame index (1 to 271)
        return Math.min(
            frameCount,
            Math.max(1, Math.ceil(scrollFraction * frameCount))
        );
    }

    // Scroll handler
    function handleScroll() {
        const frameIndex = getCurrentFrameIndex();
        requestAnimationFrame(() => drawFrame(frameIndex));

        // Animate text overlays based on scroll fraction
        animateTextOverlays();
    }

    // Text card cross-fading intervals
    function animateTextOverlays() {
        const rect = container.getBoundingClientRect();
        const scrollHeight = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / scrollHeight));

        const card1 = document.getElementById("hero-text-1");
        const card2 = document.getElementById("hero-text-2");
        const card3 = document.getElementById("hero-text-3");

        // Helper to update card opacity and translation
        function updateCard(card, show) {
            if (!card) return;
            if (show) {
                card.classList.remove("opacity-0", "translate-y-8", "pointer-events-none");
                card.classList.add("opacity-100", "translate-y-0");
            } else {
                card.classList.remove("opacity-100", "translate-y-0");
                card.classList.add("opacity-0", "translate-y-8", "pointer-events-none");
            }
        }

        // Section thresholds (3 parts)
        updateCard(card1, progress <= 0.25);
        updateCard(card2, progress > 0.30 && progress <= 0.68);
        updateCard(card3, progress > 0.72);
    }
}

