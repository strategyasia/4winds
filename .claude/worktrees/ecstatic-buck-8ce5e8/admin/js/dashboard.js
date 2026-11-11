// Global variable to store content
let siteContent = null;

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    loadContent();
    setupEventListeners();
});

// Check if user is logged in
function checkAuthentication() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const loginTime = sessionStorage.getItem('loginTime');

    // Check if logged in and session is valid (24 hours)
    if (!isLoggedIn || !loginTime) {
        window.location.href = 'index.html';
        return;
    }

    const currentTime = new Date().getTime();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

    if (currentTime - parseInt(loginTime) > sessionDuration) {
        sessionStorage.clear();
        window.location.href = 'index.html';
        return;
    }
}

// Load content from JSON
async function loadContent() {
    try {
        const response = await fetch('../content/site-content.json');
        siteContent = await response.json();
        populateForm();
    } catch (error) {
        console.error('Error loading content:', error);
        alert('Failed to load content. Please refresh the page.');
    }
}

// Populate form fields with content
function populateForm() {
    if (!siteContent) return;

    const { navigation, sliders, imageLibrary, company, home, about, contact } = siteContent;

    // Navigation Menu
    if (navigation && navigation.menuItems) {
        renderMenuItems(navigation.menuItems);
    }

    // Sliders
    if (sliders && sliders.images) {
        renderSliderImages(sliders.images);
    }

    // Image Library
    if (imageLibrary) {
        renderImageLibrary(imageLibrary);
    }

    // Company Information
    document.getElementById('company-name').value = company.name;
    document.getElementById('company-tagline').value = company.tagline;
    document.getElementById('company-phone').value = company.phone;
    document.getElementById('company-email').value = company.email;
    document.getElementById('company-address').value = company.address;

    // Home Hero
    document.getElementById('hero-title').value = home.hero.title;
    document.getElementById('hero-subtitle').value = home.hero.subtitle;
    document.getElementById('hero-cta').value = home.hero.cta;

    // Removals Section
    document.getElementById('removals-title').value = home.removals.title;
    document.getElementById('removals-subtitle').value = home.removals.subtitle;

    // Services
    renderServices(home.removals.services);

    // Stats
    renderStats(home.stats);

    // About
    document.getElementById('about-title').value = about.title;
    document.getElementById('about-mission').value = about.mission;

    // Convert story array to pipe-separated string for editing
    if (Array.isArray(about.story)) {
        document.getElementById('about-story').value = about.story.join('|');
    } else {
        document.getElementById('about-story').value = about.story;
    }

    // Values
    renderValues(about.values);

    // Team
    document.getElementById('team-title').value = about.team.title;
    renderTeam(about.team.members);

    // Contact
    document.getElementById('contact-title').value = contact.title;
    document.getElementById('contact-subtitle').value = contact.subtitle;
    document.getElementById('office-hours').value = contact.office_hours;

    // Locations
    renderLocations(contact.locations);
}

// ============= Navigation Menu Management =============

// Render menu items
function renderMenuItems(menuItems) {
    const container = document.getElementById('menu-items-list');
    if (!menuItems || menuItems.length === 0) {
        container.innerHTML = '<p style="color: #666;">No menu items yet. Click "Add Menu Item" to create one.</p>';
        return;
    }

    container.innerHTML = menuItems
        .sort((a, b) => a.order - b.order)
        .map((item, index) => `
            <div class="service-item" data-index="${index}" data-id="${item.id}" style="margin-bottom: 1rem; opacity: ${item.published ? 1 : 0.6};">
                <div style="display: grid; grid-template-columns: 1fr 1fr 100px 100px 100px; gap: 1rem; align-items: center;">
                    <div class="form-field">
                        <label>Menu Label</label>
                        <input type="text" class="menu-label" value="${item.label}" />
                    </div>
                    <div class="form-field">
                        <label>URL</label>
                        <input type="text" class="menu-url" value="${item.url}" />
                    </div>
                    <div class="form-field">
                        <label>Order</label>
                        <input type="number" class="menu-order" value="${item.order}" min="1" />
                    </div>
                    <div class="form-field">
                        <label>Published</label>
                        <input type="checkbox" class="menu-published" ${item.published ? 'checked' : ''} style="width: 20px; height: 20px; margin-top: 0.5rem;" />
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="deleteMenuItem('${item.id}')" style="margin-top: 1.5rem;">🗑 Delete</button>
                </div>
            </div>
        `).join('');
}

// Add new menu item
function addMenuItem() {
    if (!siteContent.navigation) {
        siteContent.navigation = { menuItems: [] };
    }

    const newId = 'menu_' + Date.now();
    const newOrder = siteContent.navigation.menuItems.length + 1;

    siteContent.navigation.menuItems.push({
        id: newId,
        label: 'New Menu Item',
        url: '#new',
        order: newOrder,
        published: false
    });

    renderMenuItems(siteContent.navigation.menuItems);
}

// Delete menu item
function deleteMenuItem(itemId) {
    if (confirm('Are you sure you want to delete this menu item?')) {
        siteContent.navigation.menuItems = siteContent.navigation.menuItems.filter(item => item.id !== itemId);
        renderMenuItems(siteContent.navigation.menuItems);
    }
}

// ============= Slider Management =============

// Render slider images
function renderSliderImages(images) {
    const container = document.getElementById('slider-images-list');
    if (!images || images.length === 0) {
        container.innerHTML = '<p style="color: #666;">No slider images yet. Click "Add Slider Image" to create one.</p>';
        return;
    }

    container.innerHTML = images
        .sort((a, b) => a.order - b.order)
        .map((img, index) => `
            <div class="service-item" data-index="${index}" data-id="${img.id}" style="margin-bottom: 1.5rem; opacity: ${img.published ? 1 : 0.6};">
                <div style="display: grid; grid-template-columns: 150px 1fr 1fr 100px 100px 100px; gap: 1rem; align-items: start;">
                    <div>
                        <img src="../${img.url}" alt="${img.alt}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; border: 2px solid #ddd;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22100%22%3E%3Crect fill=%22%23ddd%22 width=%22150%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E'" />
                    </div>
                    <div class="form-field">
                        <label>Image URL</label>
                        <input type="text" class="slider-url" value="${img.url}" placeholder="images/your-image.jpg" />
                    </div>
                    <div class="form-field">
                        <label>Alt Text</label>
                        <input type="text" class="slider-alt" value="${img.alt}" />
                    </div>
                    <div class="form-field">
                        <label>Order</label>
                        <input type="number" class="slider-order" value="${img.order}" min="1" />
                    </div>
                    <div class="form-field">
                        <label>Published</label>
                        <input type="checkbox" class="slider-published" ${img.published ? 'checked' : ''} style="width: 20px; height: 20px; margin-top: 0.5rem;" />
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="deleteSliderImage('${img.id}')" style="margin-top: 1.5rem;">🗑 Delete</button>
                </div>
            </div>
        `).join('');
}

// Add new slider image
function addSliderImage() {
    if (!siteContent.sliders) {
        siteContent.sliders = { images: [] };
    }

    const newId = 'slider_' + Date.now();
    const newOrder = siteContent.sliders.images.length + 1;

    siteContent.sliders.images.push({
        id: newId,
        url: 'images/new-image.jpg',
        alt: 'New Slider Image',
        order: newOrder,
        published: false
    });

    renderSliderImages(siteContent.sliders.images);
}

// Delete slider image
function deleteSliderImage(imageId) {
    if (confirm('Are you sure you want to delete this slider image?')) {
        siteContent.sliders.images = siteContent.sliders.images.filter(img => img.id !== imageId);
        renderSliderImages(siteContent.sliders.images);
    }
}

// ============= Image Library Management =============

// Render image library
function renderImageLibrary(images) {
    const container = document.getElementById('image-library-grid');
    if (!images || images.length === 0) {
        container.innerHTML = '<p style="color: #666; grid-column: 1/-1;">No images in library yet. Click "Upload Image" to add images.</p>';
        return;
    }

    container.innerHTML = images.map((img, index) => `
        <div class="image-library-item" style="position: relative; border: 2px solid #ddd; border-radius: 8px; padding: 0.5rem; background: white;">
            <img src="${img.url}" alt="${img.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px;" />
            <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${img.name}">${img.name}</p>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                <button class="btn btn-primary btn-sm" onclick="copyImageUrl('${img.url}')" style="flex: 1; font-size: 0.75rem; padding: 0.3rem;">📋 Copy URL</button>
                <button class="btn btn-secondary btn-sm" onclick="deleteImage(${index})" style="flex: 0; font-size: 0.75rem; padding: 0.3rem;">🗑</button>
            </div>
        </div>
    `).join('');
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        const imageName = file.name;

        if (!siteContent.imageLibrary) {
            siteContent.imageLibrary = [];
        }

        siteContent.imageLibrary.push({
            name: imageName,
            url: imageData,
            uploadedAt: new Date().toISOString()
        });

        renderImageLibrary(siteContent.imageLibrary);

        alert(`Image "${imageName}" uploaded successfully!\n\nNote: This is stored as base64 data in your JSON file. For production, you should manually save the image to your images folder and update the URL to use a file path like "images/${imageName}"`);
    };

    reader.readAsDataURL(file);
    event.target.value = ''; // Reset input
}

// Copy image URL to clipboard
function copyImageUrl(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('Image URL copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Image URL copied to clipboard!');
    });
}

// Delete image from library
function deleteImage(index) {
    if (confirm('Are you sure you want to delete this image from the library?')) {
        siteContent.imageLibrary.splice(index, 1);
        renderImageLibrary(siteContent.imageLibrary);
    }
}

// ============= Existing Render Functions =============

// Render services list
function renderServices(services) {
    const container = document.getElementById('services-list');
    container.innerHTML = services.map((service, index) => `
        <div class="service-item" data-index="${index}">
            <div class="form-field">
                <label>Icon</label>
                <input type="text" class="service-icon" value="${service.icon}" />
            </div>
            <div>
                <div class="form-field">
                    <label>Title</label>
                    <input type="text" class="service-title" value="${service.title}" />
                </div>
                <div class="form-field">
                    <label>Description</label>
                    <textarea class="service-description" rows="2">${service.description}</textarea>
                </div>
            </div>
        </div>
    `).join('');
}

// Render stats list
function renderStats(stats) {
    const container = document.getElementById('stats-list');
    container.innerHTML = stats.map((stat, index) => `
        <div class="service-item" data-index="${index}" style="margin-bottom: 1.5rem;">
            <div class="form-row">
                <div class="form-field">
                    <label>Number/Value</label>
                    <input type="text" class="stat-number" value="${stat.number}" />
                </div>
                <div class="form-field">
                    <label>Label</label>
                    <input type="text" class="stat-label" value="${stat.label}" />
                </div>
            </div>
        </div>
    `).join('');
}

// Render values list
function renderValues(values) {
    const container = document.getElementById('values-list');
    container.innerHTML = values.map((value, index) => `
        <div class="service-item" data-index="${index}" style="margin-bottom: 1.5rem;">
            <div class="form-field">
                <label>Title</label>
                <input type="text" class="value-title" value="${value.title}" />
            </div>
            <div class="form-field">
                <label>Description</label>
                <textarea class="value-description" rows="3">${value.description}</textarea>
            </div>
        </div>
    `).join('');
}

// Render team list
function renderTeam(members) {
    const container = document.getElementById('team-list');
    container.innerHTML = members.map((member, index) => `
        <div class="service-item" data-index="${index}" style="margin-bottom: 2rem; padding: 1.5rem; border: 2px solid #e0e0e0; border-radius: 8px; background: #fafafa;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div class="form-field">
                    <label style="font-weight: 600; color: #333;">Name</label>
                    <input type="text" class="team-name" value="${member.name}" style="width: 100%; padding: 0.75rem; font-size: 1rem;" />
                </div>
                <div class="form-field">
                    <label style="font-weight: 600; color: #333;">Position</label>
                    <input type="text" class="team-position" value="${member.position}" style="width: 100%; padding: 0.75rem; font-size: 1rem;" />
                </div>
            </div>
            <div class="form-field">
                <label style="font-weight: 600; color: #333; margin-bottom: 0.5rem; display: block;">Biography / Description</label>
                <textarea class="team-bio" rows="6" style="width: 100%; padding: 0.75rem; font-size: 1rem; font-family: inherit; line-height: 1.6; resize: vertical; min-height: 120px;">${member.bio}</textarea>
            </div>
        </div>
    `).join('');
}

// Render locations list
function renderLocations(locations) {
    const container = document.getElementById('locations-list');
    container.innerHTML = locations.map((location, index) => `
        <div class="service-item" data-index="${index}" style="margin-bottom: 1.5rem;">
            <div class="form-field">
                <label>City</label>
                <input type="text" class="location-city" value="${location.city}" />
            </div>
            <div>
                <div class="form-field">
                    <label>Address</label>
                    <input type="text" class="location-address" value="${location.address}" />
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label>Phone</label>
                        <input type="text" class="location-phone" value="${location.phone}" />
                    </div>
                    <div class="form-field">
                        <label>Email</label>
                        <input type="email" class="location-email" value="${location.email}" />
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Save button
    document.getElementById('save-all-btn').addEventListener('click', saveAllChanges);

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    });
}

// Save all changes
function saveAllChanges() {
    if (!siteContent) {
        alert('No content loaded. Please refresh the page.');
        return;
    }

    try {
        // Update navigation menu
        if (siteContent.navigation && siteContent.navigation.menuItems) {
            const menuItems = document.querySelectorAll('#menu-items-list .service-item');
            siteContent.navigation.menuItems = Array.from(menuItems).map(item => ({
                id: item.dataset.id,
                label: item.querySelector('.menu-label').value,
                url: item.querySelector('.menu-url').value,
                order: parseInt(item.querySelector('.menu-order').value),
                published: item.querySelector('.menu-published').checked
            }));
        }

        // Update slider images
        if (siteContent.sliders && siteContent.sliders.images) {
            const sliderItems = document.querySelectorAll('#slider-images-list .service-item');
            siteContent.sliders.images = Array.from(sliderItems).map(item => ({
                id: item.dataset.id,
                url: item.querySelector('.slider-url').value,
                alt: item.querySelector('.slider-alt').value,
                order: parseInt(item.querySelector('.slider-order').value),
                published: item.querySelector('.slider-published').checked
            }));
        }

        // Image library is already updated in real-time during upload/delete

        // Update company information
        siteContent.company.name = document.getElementById('company-name').value;
        siteContent.company.tagline = document.getElementById('company-tagline').value;
        siteContent.company.phone = document.getElementById('company-phone').value;
        siteContent.company.email = document.getElementById('company-email').value;
        siteContent.company.address = document.getElementById('company-address').value;

        // Update hero
        siteContent.home.hero.title = document.getElementById('hero-title').value;
        siteContent.home.hero.subtitle = document.getElementById('hero-subtitle').value;
        siteContent.home.hero.cta = document.getElementById('hero-cta').value;

        // Update removals
        siteContent.home.removals.title = document.getElementById('removals-title').value;
        siteContent.home.removals.subtitle = document.getElementById('removals-subtitle').value;

        // Update services
        const serviceItems = document.querySelectorAll('.service-item');
        siteContent.home.removals.services = Array.from(serviceItems).map(item => ({
            icon: item.querySelector('.service-icon').value,
            title: item.querySelector('.service-title').value,
            description: item.querySelector('.service-description').value
        }));

        // Update about
        siteContent.about.title = document.getElementById('about-title').value;
        siteContent.about.mission = document.getElementById('about-mission').value;

        // Convert pipe-separated story back to array
        const storyText = document.getElementById('about-story').value;
        siteContent.about.story = storyText.split('|').map(s => s.trim()).filter(s => s.length > 0);

        // Update contact
        siteContent.contact.title = document.getElementById('contact-title').value;
        siteContent.contact.subtitle = document.getElementById('contact-subtitle').value;
        siteContent.contact.office_hours = document.getElementById('office-hours').value;

        // Update locations
        const locationItems = document.querySelectorAll('#locations-list .service-item');
        siteContent.contact.locations = Array.from(locationItems).map(item => ({
            city: item.querySelector('.location-city').value,
            address: item.querySelector('.location-address').value,
            phone: item.querySelector('.location-phone').value,
            email: item.querySelector('.location-email').value
        }));

        // Update stats
        const statItems = document.querySelectorAll('#stats-list .service-item');
        siteContent.home.stats = Array.from(statItems).map(item => ({
            number: item.querySelector('.stat-number').value,
            label: item.querySelector('.stat-label').value
        }));

        // Update values
        const valueItems = document.querySelectorAll('#values-list .service-item');
        siteContent.about.values = Array.from(valueItems).map(item => ({
            title: item.querySelector('.value-title').value,
            description: item.querySelector('.value-description').value
        }));

        // Update team
        siteContent.about.team.title = document.getElementById('team-title').value;
        const teamItems = document.querySelectorAll('#team-list .service-item');
        siteContent.about.team.members = Array.from(teamItems).map(item => ({
            name: item.querySelector('.team-name').value,
            position: item.querySelector('.team-position').value,
            bio: item.querySelector('.team-bio').value
        }));

        // Download the updated JSON file
        downloadJSON();

        // Show success indicator
        showSaveIndicator();

    } catch (error) {
        console.error('Error saving changes:', error);
        alert('Failed to save changes. Please try again.');
    }
}

// Download JSON file
function downloadJSON() {
    const dataStr = JSON.stringify(siteContent, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'site-content.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Show save indicator
function showSaveIndicator() {
    const indicator = document.getElementById('save-indicator');
    indicator.classList.add('show');

    setTimeout(() => {
        indicator.classList.remove('show');
    }, 3000);

    // Alert user about next steps
    alert('Changes saved! A new "site-content.json" file has been downloaded.\n\nIMPORTANT: Replace the file at:\n/Users/vinson/Desktop/4wind/content/site-content.json\n\nwith the downloaded file to see changes on the website.');
}
