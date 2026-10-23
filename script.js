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

    
/* --- PROJECT PHOTO GALLERY --- */

const projectGalleries = {
    french: {
        title: "French Styled Country Home",
        folder: "images/FRENCH/",
        count: 8
    },
    auckland: {
        title: "Auckland Villa Refurbishment",
        folder: "images/AUCKLAND_VILLA_REFURBISHMENT/",
        count: 7
    },
    grandparent: {
        title: "Grandparents Beach House",
        folder: "images/GRANDPARENT/",
        count: 9
    },
    villa: {
        title: "Villa Addition",
        folder: "images/VILLA/",
        count: 9
    }
};

const gallery = document.getElementById("project-gallery");
const galleryImage = document.getElementById("gallery-image");
const galleryTitle = document.getElementById("gallery-project-title");
const galleryCounter = document.getElementById("gallery-counter");

const closeButton = gallery.querySelector(".gallery-close");
const previousButton = gallery.querySelector(".gallery-prev");
const nextButton = gallery.querySelector(".gallery-next");

let currentProject = null;
let currentPhoto = 1;
let previousFocus = null;

function showGalleryPhoto() {
    const project = projectGalleries[currentProject];

    galleryImage.src = `${project.folder}${currentPhoto}.png`;
    galleryImage.alt = `${project.title} — photo ${currentPhoto}`;

    galleryTitle.textContent = project.title;
    galleryCounter.textContent = `${currentPhoto} / ${project.count}`;

    previousButton.disabled = currentPhoto === 1;
    nextButton.disabled = currentPhoto === project.count;

    previousButton.style.opacity = currentPhoto === 1 ? "0.3" : "1";
    nextButton.style.opacity =
        currentPhoto === project.count ? "0.3" : "1";
}

function openProjectGallery(projectKey) {
    if (!projectGalleries[projectKey]) return;

    currentProject = projectKey;
    currentPhoto = 1;
    previousFocus = document.activeElement;

    showGalleryPhoto();

    gallery.classList.add("is-open");
    gallery.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeButton.focus();
}

function closeProjectGallery() {
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    galleryImage.src = "";
    currentProject = null;

    if (previousFocus) {
        previousFocus.focus();
    }
}

function changeGalleryPhoto(direction) {
    if (!currentProject) return;

    const project = projectGalleries[currentProject];
    const nextPhoto = currentPhoto + direction;

    if (nextPhoto < 1 || nextPhoto > project.count) return;

    currentPhoto = nextPhoto;
    showGalleryPhoto();
}

document.querySelectorAll(".placeholder-media-box[data-gallery]")
    .forEach(card => {
        card.addEventListener("click", () => {
            openProjectGallery(card.dataset.gallery);
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openProjectGallery(card.dataset.gallery);
            }
        });
    });

closeButton.addEventListener("click", closeProjectGallery);

previousButton.addEventListener("click", () => {
    changeGalleryPhoto(-1);
});

nextButton.addEventListener("click", () => {
    changeGalleryPhoto(1);
});

gallery.addEventListener("click", event => {
    if (event.target === gallery) {
        closeProjectGallery();
    }
});

document.addEventListener("keydown", event => {
    if (!gallery.classList.contains("is-open")) return;

    if (event.key === "Escape") {
        closeProjectGallery();
    } else if (event.key === "ArrowLeft") {
        changeGalleryPhoto(-1);
    } else if (event.key === "ArrowRight") {
        changeGalleryPhoto(1);
    }
});

document.getElementById('letsTalkBtn').addEventListener('click', function(e) {
  e.preventDefault(); // Stop default jump behavior
  
  const targetSection = document.getElementById('contact'); // Matches the id="contact" at the bottom
  
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
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