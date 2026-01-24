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
        populateServices();
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
                    <a href="${item.url}" class="nav-link" onclick="showSection('${sectionName}')">
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
        const iconImages = ['8.png', '6.png', '4.png', 'peticon.png', 'car.png', '4.png'];
        const iconContent = `<img src="images/${iconImages[index]}" alt="${service.title}" class="icon-image">`;

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

// Populate services section
function populateServices() {
    const { services } = siteContent;

    document.getElementById('services-title').textContent = services.title;
    document.getElementById('services-subtitle').textContent = services.subtitle;
    document.getElementById('services-description').textContent = services.description;

    const servicesGrid = document.getElementById('services-detailed-grid');
    servicesGrid.innerHTML = services.servicesList.map(service => `
        <div class="service-detailed-card">
            <div class="service-icon-large">${service.icon}</div>
            <h3>${service.title}</h3>
            <p class="service-desc">${service.description}</p>
            <div class="service-features">
                <h4>Key Features:</h4>
                <ul>
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <a href="#contact" class="btn btn-primary" onclick="showSection('contact')">Request Quote</a>
        </div>
    `).join('');
}

// Populate contact section
function populateContact() {
    const { contact, company } = siteContent;

    document.getElementById('contact-title').textContent = contact.title;
    document.getElementById('contact-subtitle').textContent = contact.subtitle;
    document.getElementById('company-phone').textContent = company.phone;
    document.getElementById('company-email').textContent = company.email;
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
    document.getElementById('footer-email').textContent = company.email;
    document.getElementById('footer-company').textContent = company.name;
}

// Initialize service pages
function initializeServicePages() {
    if (!siteContent) return;

    // Household Goods Moving
    if (siteContent.householdGoods) {
        const elem = document.getElementById('household-goods-content');
        if (elem) elem.textContent = siteContent.householdGoods.content;
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
        if (elem) elem.textContent = siteContent.projectCargo.content;
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

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
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
function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    // For this basic version, we'll just show a success message
    alert('Thank you for your message! We will contact you soon.');

    // Reset form
    event.target.reset();

    // In a real application, you would do something like:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
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

// Make functions available globally
window.showSection = showSection;
window.toggleMobileMenu = toggleMobileMenu;
window.handleFormSubmit = handleFormSubmit;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
