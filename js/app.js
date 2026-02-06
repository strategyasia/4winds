// Global content variable
let siteContent = null;

// Load content on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadContent();
    initializeNavigation();
    initializeServicePages();
});

// Load content from JSON file
async function loadContent() {
    try {
        const response = await fetch('content/site-content.json');
        siteContent = await response.json();

        // Populate all sections
        populateNavigation();
        populateCompanyInfo();
        populateHome();
        populateAbout();
        populateContact();
        populateFooter();

        console.log('Content loaded successfully');
    } catch (error) {
        console.error('Error loading content:', error);
        alert('Failed to load website content. Please refresh the page.');
    }
}

// Populate company information (header)
function populateCompanyInfo() {
    // Company name removed from header - logo only
}

// Populate navigation menu
function populateNavigation() {
    if (!siteContent.navigation || !siteContent.navigation.menuItems) return;

    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    // Filter only published menu items and sort by order
    const publishedItems = siteContent.navigation.menuItems
        .filter(item => item.published)
        .sort((a, b) => a.order - b.order);

    navMenu.innerHTML = publishedItems.map(item => {
        // Extract section name from URL (e.g., #home -> home)
        const sectionName = item.url.replace('#', '');

        // Check if item has dropdown
        if (item.hasDropdown && item.submenu) {
            return `
                <li class="dropdown">
                    <a href="#" class="nav-link" onclick="return false;">
                        ${item.label} <span class="dropdown-arrow">▼</span>
                    </a>
                    <ul class="dropdown-menu">
                        ${item.submenu.map(subitem => {
                            // Check if submenu item has nested submenu
                            if (subitem.hasSubmenu && subitem.submenu) {
                                const subSectionName = subitem.url.replace('#', '');
                                return `
                                    <li class="dropdown-submenu">
                                        <a href="${subitem.url}" onclick="showSection('${subSectionName}')">${subitem.label} <span class="submenu-arrow">►</span></a>
                                        <ul class="dropdown-submenu-menu">
                                            ${subitem.submenu.map(nestedItem => {
                                                const nestedSectionName = nestedItem.url.replace('#', '');
                                                return `<li><a href="${nestedItem.url}" onclick="showSection('${nestedSectionName}')">${nestedItem.label}</a></li>`;
                                            }).join('')}
                                        </ul>
                                    </li>
                                `;
                            } else {
                                const subSectionName = subitem.url.replace('#', '');
                                return `<li><a href="${subitem.url}" onclick="showSection('${subSectionName}')">${subitem.label}</a></li>`;
                            }
                        }).join('')}
                    </ul>
                </li>
            `;
        } else {
            return `<li><a href="${item.url}" class="nav-link" onclick="showSection('${sectionName}')">${item.label}</a></li>`;
        }
    }).join('');
}

// Populate home section
function populateHome() {
    const { home } = siteContent;

    // Hero section
    document.getElementById('hero-title').textContent = home.hero.title;
    document.getElementById('hero-subtitle').textContent = home.hero.subtitle;
    document.getElementById('hero-cta').textContent = home.hero.cta;

    // Removals Solutions
    document.getElementById('removals-title').textContent = home.removals.title;
    document.getElementById('removals-subtitle').textContent = home.removals.subtitle;

    const removalsGrid = document.getElementById('removals-grid');
    removalsGrid.innerHTML = home.removals.services.map((service, index) => {
        // Map each card to its corresponding icon image
        const iconImages = ['8.png', '6.png', 'content/PHOTO-2026-01-31-13-00-24.jpg', 'peticon.png', 'car.png', 'content/projcargo.png'];
        const iconContent = `<img src="${iconImages[index].startsWith('content/') ? iconImages[index] : 'images/' + iconImages[index]}" alt="${service.title}" class="icon-image">`;

        // Map each card to its corresponding service page
        const serviceLinks = ['international', 'domestic', 'household-goods', 'pets-relocation', 'cars-automobile', 'project-cargo'];
        const serviceLink = serviceLinks[index] || 'contact';

        return `
            <div class="removal-card" onclick="showSection('${serviceLink}')">
                <div class="removal-icon image-icon">${iconContent}</div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <a href="#${serviceLink}" class="btn-quote" onclick="event.stopPropagation(); showSection('${serviceLink}')">Learn More</a>
            </div>
        `;
    }).join('');

    // Stats
    const statsGrid = document.getElementById('stats-grid');
    statsGrid.innerHTML = home.stats.map(stat => `
        <div class="stat-card">
            <h3>${stat.number}</h3>
            <p>${stat.label}</p>
        </div>
    `).join('');
}

// Populate about section
function populateAbout() {
    const { about } = siteContent;

    document.getElementById('about-title').textContent = about.title;
    document.getElementById('about-mission').textContent = about.mission;

    // Display story as multiple paragraphs
    const storyContainer = document.getElementById('about-story');
    if (Array.isArray(about.story)) {
        storyContainer.innerHTML = about.story.map(paragraph => `<p>${paragraph}</p>`).join('');
    } else {
        storyContainer.textContent = about.story;
    }

    // Values
    const valuesGrid = document.getElementById('values-grid');
    valuesGrid.innerHTML = about.values.map(value => `
        <div class="value-card">
            <h3>${value.title}</h3>
            <p>${value.description}</p>
        </div>
    `).join('');

    // Team
    document.getElementById('team-title').textContent = about.team.title;
    const teamGrid = document.getElementById('team-grid');
    teamGrid.innerHTML = about.team.members.map(member => `
        <div class="team-member">
            <h4>${member.name}</h4>
            <p class="position">${member.position}</p>
            <p>${member.bio}</p>
        </div>
    `).join('');
}

// Populate services section - REMOVED (services page deleted)

// Populate contact section
function populateContact() {
    const { contact, company } = siteContent;

    document.getElementById('contact-title').textContent = contact.title;
    document.getElementById('contact-subtitle').textContent = contact.subtitle;
    document.getElementById('company-phone').textContent = company.phone;
    document.getElementById('company-email').innerHTML = company.email;
    document.getElementById('company-address').textContent = company.address;
    document.getElementById('office-hours').textContent = contact.office_hours;

    // Locations section removed - replaced with full-view map
}

// Populate footer
function populateFooter() {
    const { company } = siteContent;

    document.getElementById('footer-company-name').textContent = company.name;
    document.getElementById('footer-tagline').textContent = company.tagline;
    document.getElementById('footer-phone').textContent = company.phone;
    document.getElementById('footer-email').innerHTML = company.email;
    document.getElementById('footer-company').textContent = company.name;
}

// Initialize service pages
function initializeServicePages() {
    if (!siteContent) return;

    // Warehousing
    if (siteContent.householdGoods) {
        const elem = document.getElementById('household-goods-content');
        if (elem) elem.innerHTML = siteContent.householdGoods.content;
    }

    // International Moving
    if (siteContent.international) {
        const elem = document.getElementById('international-content');
        if (elem) elem.textContent = siteContent.international.content;
    }

    // Domestic Moving
    if (siteContent.domestic) {
        const elem = document.getElementById('domestic-content');
        if (elem) elem.textContent = siteContent.domestic.content;
    }

    // Cars/Automobile
    if (siteContent.carsAutomobile) {
        const elem = document.getElementById('cars-automobile-content');
        if (elem) elem.textContent = siteContent.carsAutomobile.content;
    }

    // Pets Relocation
    if (siteContent.petsRelocation) {
        const elem = document.getElementById('pets-relocation-content');
        if (elem) elem.textContent = siteContent.petsRelocation.content;
    }

    // Project Cargo
    if (siteContent.projectCargo) {
        const elem = document.getElementById('project-cargo-content');
        if (elem) elem.innerHTML = siteContent.projectCargo.content;
    }
}

// Navigation functions
function initializeNavigation() {
    // Set initial section
    showSection('home');

    // Handle hash changes
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
        }
    });
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(`${sectionName}-section`);
    if (section) {
        section.classList.add('active');
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionName}`) {
            link.classList.add('active');
        }
    });

    // Close mobile menu if open
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        document.querySelector('.mobile-menu-toggle').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    navMenu.classList.toggle('active');
    toggle.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Mobile dropdown toggle - called from navigation items
function toggleDropdown(event) {
    // Only for mobile screens
    if (window.innerWidth <= 768) {
        event.preventDefault();
        event.stopPropagation();

        const dropdown = event.currentTarget.closest('.dropdown, .dropdown-submenu');
        if (dropdown) {
            dropdown.classList.toggle('active');
        }
    }
}

// Add click handlers to dropdowns for mobile
document.addEventListener('DOMContentLoaded', () => {
    // Wait for navigation to be populated
    setTimeout(() => {
        const dropdowns = document.querySelectorAll('.dropdown > .nav-link');
        dropdowns.forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    link.parentElement.classList.toggle('active');
                }
            });
        });

        const submenus = document.querySelectorAll('.dropdown-submenu > a');
        submenus.forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    link.parentElement.classList.toggle('active');
                }
            });
        });
    }, 500);
});

// Handle contact form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = document.getElementById('submit-btn');
    const statusDiv = document.getElementById('form-status');

    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusDiv.style.display = 'none';

    try {
        // Get form data
        const formData = new FormData(form);

        // Send to FormSubmit
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Show success message
            statusDiv.innerHTML = '<p style="color: #10b981; background: #d1fae5; padding: 1rem; border-radius: 8px; text-align: center;">✓ Thank you! Your message has been sent successfully. We will contact you soon.</p>';
            statusDiv.style.display = 'block';

            // Reset form
            form.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Show error message
        statusDiv.innerHTML = '<p style="color: #ef4444; background: #fee2e2; padding: 1rem; border-radius: 8px; text-align: center;">✗ Sorry, there was an error sending your message. Please email us directly at edgar@fourwindsinternatinal.com</p>';
        statusDiv.style.display = 'block';
        console.error('Form submission error:', error);
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

// Image Slider Functionality
let currentSlide = 0;
const slides = [];
const dots = [];

// Initialize slider after page load
document.addEventListener('DOMContentLoaded', () => {
    const slideElements = document.querySelectorAll('.slide');
    const dotElements = document.querySelectorAll('.dot');

    slideElements.forEach(slide => slides.push(slide));
    dotElements.forEach(dot => dots.push(dot));

    // Initialize slide positions
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
    });

    // Auto-play slider
    setInterval(() => {
        changeSlide(1);
    }, 5000);
});

function changeSlide(direction) {
    // Remove active class from current dot
    if (dots[currentSlide]) {
        dots[currentSlide].classList.remove('active');
    }

    // Calculate new slide index
    currentSlide += direction;

    // Loop around
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    // Update all slides with transform
    slides.forEach((slide, index) => {
        const offset = (index - currentSlide) * 100;
        slide.style.transform = `translateX(${offset}%)`;
    });

    // Add active class to new dot
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function goToSlide(index) {
    // Remove active class from current dot
    if (dots[currentSlide]) {
        dots[currentSlide].classList.remove('active');
    }

    // Set new index
    currentSlide = index;

    // Update all slides with transform
    slides.forEach((slide, slideIndex) => {
        const offset = (slideIndex - currentSlide) * 100;
        slide.style.transform = `translateX(${offset}%)`;
    });

    // Add active class to new dot
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

// Gallery Modal Functionality for Project Cargo Completed Section
let currentProjectImages = [];
let currentImageIndex = 0;

const projectGalleries = {
    1: [
        'https://via.placeholder.com/800x600/1e40af/ffffff?text=Philips+Malaysia+Image+1',
        'https://via.placeholder.com/800x600/1e40af/ffffff?text=Philips+Malaysia+Image+2',
        'https://via.placeholder.com/800x600/1e40af/ffffff?text=Philips+Malaysia+Image+3'
    ],
    2: [
        'content/read-rite/PHOTO-2026-01-27-13-46-29.jpg',
        'content/read-rite/PHOTO-2026-01-27-13-46-30.jpg',
        'content/read-rite/PHOTO-2026-01-27-13-46-30 2.jpg'
    ],
    3: [
        'https://via.placeholder.com/800x600/1e40af/ffffff?text=Read-Rite+Philippines+Image+1',
        'https://via.placeholder.com/800x600/1e40af/ffffff?text=Read-Rite+Philippines+Image+2',
        'https://via.placeholder.com/800x600/1e40af/ffffff?text=Read-Rite+Philippines+Image+3'
    ],
    4: [
        'content/klcc/16029947-exterior-mandarin-oriental-kuala-lumpur.webp',
        'content/klcc/20191206_466044.webp',
        'content/klcc/maxresdefault.jpg'
    ]
};

const projectTitles = {
    1: 'Philips Lights Malaysia',
    2: 'Read-Rite Malaysia',
    3: 'Read-Rite Philippines',
    4: 'MANDARIN HOTEL (KLCC)'
};

function openGalleryModal(projectId, imageIndex) {
    currentProjectImages = projectGalleries[projectId];
    currentImageIndex = imageIndex;

    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const caption = document.getElementById('modal-caption');

    if (modal && modalImg && caption) {
        modal.style.display = 'flex';
        modalImg.src = currentProjectImages[currentImageIndex];
        caption.textContent = `${projectTitles[projectId]} - Image ${currentImageIndex + 1} of ${currentProjectImages.length}`;

        document.body.style.overflow = 'hidden';
    }
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function changeModalImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = currentProjectImages.length - 1;
    } else if (currentImageIndex >= currentProjectImages.length) {
        currentImageIndex = 0;
    }

    const modalImg = document.getElementById('modal-image');
    const caption = document.getElementById('modal-caption');

    if (modalImg && caption) {
        modalImg.src = currentProjectImages[currentImageIndex];

        const currentProject = Object.keys(projectGalleries).find(key =>
            projectGalleries[key] === currentProjectImages
        );
        caption.textContent = `${projectTitles[currentProject]} - Image ${currentImageIndex + 1} of ${currentProjectImages.length}`;
    }
}

// Keyboard navigation for gallery modal
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('gallery-modal');
    if (modal && modal.style.display === 'flex') {
        if (event.key === 'Escape') {
            closeGalleryModal();
        } else if (event.key === 'ArrowLeft') {
            changeModalImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeModalImage(1);
        }
    }
});

// Make functions available globally
window.showSection = showSection;
window.toggleMobileMenu = toggleMobileMenu;
window.handleFormSubmit = handleFormSubmit;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.openGalleryModal = openGalleryModal;
window.closeGalleryModal = closeGalleryModal;
window.changeModalImage = changeModalImage;
