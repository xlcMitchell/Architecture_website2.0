/* ==========================================================================
   DAVID ARCHITECTURAL DESIGNER - DRAFT 3 JAVASCRIPT
   Update: UX enhancement for mobile sticky selector
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE NAVIGATION TOGGLE
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. FEELINGS TABS SWITCHER WITH MOBILE SCROLL ENHANCEMENT
    const feelingBtns = document.querySelectorAll('.feeling-btn');
    const feelingCards = document.querySelectorAll('.feeling-card');
    const feelingStage = document.getElementById('feelingStage');
    const feelingSelector = document.getElementById('feelingSelector');

    // Get calculated CSS variables
    const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
    // Mobile selector height is roughly calculated but will be measured properly in the function
    
    feelingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedFeeling = btn.getAttribute('data-feeling');
            
            // UX Enhancement: If in mobile view and selector is sticky, scroll back to the start of the content stage
            // We measure if mobile view via JS matching the media query
            if (window.matchMedia("(max-width: 800px)").matches) {
                // If the content is currently being viewed (user has scrolled past start of stage)
                if (feelingStage.getBoundingClientRect().top < (headerHeight + feelingSelector.offsetHeight)) {
                    // Smoothly scroll the user back to where the content *starts*
                    // We target the stage's top, offset by both the sticky header and the sticky selector bar
                    const offsetScroll = feelingStage.offsetTop - headerHeight - feelingSelector.offsetHeight;
                    window.scrollTo({
                        top: offsetScroll,
                        behavior: 'smooth'
                    });
                }
            }

            // --- Regular Tab Logic ---
            // Deactivate all buttons & cards
            feelingBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            feelingCards.forEach(card => card.classList.remove('active'));

            // Activate chosen button & card
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const targetCard = document.getElementById(`feeling-${selectedFeeling}`);
            if (targetCard) {
                targetCard.classList.add('active');
            }
        });
    });

    // 3. CONTACT FORM SUBMISSION PLACEHOLDER
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = "Thank you. Your message has been sent direct to David.";
            formStatus.style.color = "#FFFFFF";
            contactForm.reset();
        });
    }
});