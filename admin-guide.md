# Four Winds Worldwide
## Admin Dashboard User Guide

**Version 2.0**
**Last Updated: January 30, 2026**

---

## Table of Contents

1. [Introduction](#introduction)
2. [Accessing the Admin Dashboard](#accessing-the-admin-dashboard)
3. [Dashboard Overview](#dashboard-overview)
4. [Managing Content](#managing-content)
   - [Navigation Menu](#navigation-menu)
   - [Slider Images](#slider-images)
   - [Image Library](#image-library)
   - [Company Information](#company-information)
   - [Home Page Content](#home-page-content)
   - [About Us Page](#about-us-page)
   - [Services](#services)
   - [Contact Information](#contact-information)
5. [Saving Changes](#saving-changes)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Introduction

The Four Winds Worldwide Admin Dashboard is a web-based content management system that allows you to easily update and manage your website content without technical knowledge. This guide will walk you through all features and help you maintain your website efficiently.

### What You Can Do

- Update company information (phone, email, address)
- Edit page content and descriptions
- Manage navigation menu items
- Update slider images on the homepage
- Manage image library
- Edit team member information
- Update service descriptions
- Modify contact information

---

## Accessing the Admin Dashboard

### Step 1: Open the Admin Login Page

1. Navigate to: `/admin/index.html` in your browser
2. You'll see the Four Winds Worldwide Admin Login page

### Step 2: Log In

1. **Username**: `admin`
2. **Password**: `fourwinds2024`
3. Click the **"Login"** button

**Important Security Notes:**
- Your session will remain active for 24 hours
- Always log out when finished
- Change the default password in production
- Don't share login credentials

### Step 3: Dashboard Access

After successful login, you'll be redirected to the main dashboard where you can manage all website content.

---

## Dashboard Overview

### Header Section

At the top of the dashboard, you'll find:

- **Admin Dashboard Title**: Confirms you're in the admin area
- **Save All Changes** button (green): Saves all your edits
- **View Website** button: Opens the live website in a new tab
- **Logout** button: Ends your session

### Content Sections

The dashboard is organized into collapsible sections, each managing different parts of your website:

1. Navigation Menu
2. Slider Images
3. Image Library
4. Company Information
5. Home - Hero Section
6. Home - Removals Solutions
7. Home - Statistics
8. About Us Page
9. About - Our Values
10. About - Our Team
11. Contact Us Page

---

## Managing Content

### Navigation Menu

**Purpose**: Manage the main navigation menu at the top of your website.

#### Viewing Menu Items

- All menu items are displayed in order
- Published items appear normal; unpublished items appear faded
- Each item shows: Label, URL, Order, and Published status

#### Editing a Menu Item

1. Locate the menu item you want to edit
2. Modify any of these fields:
   - **Menu Label**: The text displayed in the menu
   - **URL**: Where the link points (e.g., `#home`, `#about`)
   - **Order**: Number determining position (1 = first, 2 = second, etc.)
   - **Published**: Check to show, uncheck to hide

#### Adding a New Menu Item

1. Click the **"+ Add Menu Item"** button
2. A new menu item appears with default values
3. Edit all fields as needed
4. Set Published to checked when ready to display
5. Click **"Save All Changes"**

#### Deleting a Menu Item

1. Click the **"Delete"** button (trash icon) next to the item
2. Confirm the deletion
3. Click **"Save All Changes"** to apply

---

### Slider Images

**Purpose**: Manage the rotating images on the homepage hero section.

#### Viewing Slider Images

- Images are displayed with thumbnail previews
- Shows: Image preview, URL, Alt text, Order, and Published status
- Unpublished images appear faded

#### Editing a Slider Image

1. Locate the image you want to edit
2. Modify any of these fields:
   - **Image URL**: Path to the image file (e.g., `images/slider1.jpg`)
   - **Alt Text**: Description for accessibility and SEO
   - **Order**: Display sequence (1 = first slide, 2 = second, etc.)
   - **Published**: Check to show, uncheck to hide

**Image URL Guidelines:**
- Use relative paths: `images/your-image.jpg`
- Recommended size: 1920x1080 pixels (16:9 ratio)
- Supported formats: JPG, PNG, WebP
- Keep file size under 500KB for fast loading

#### Adding a New Slider Image

1. Click the **"+ Add Slider Image"** button
2. Update the Image URL to your image path
3. Add descriptive Alt Text
4. Set the Order number
5. Check Published when ready
6. Click **"Save All Changes"**

#### Deleting a Slider Image

1. Click the **"Delete"** button (trash icon)
2. Confirm the deletion
3. Click **"Save All Changes"**

---

### Image Library

**Purpose**: Store and manage reusable images for your website.

#### Uploading Images

1. Click the **"Upload Image"** button
2. Select an image file from your computer
3. The image will be added to the library
4. **Important**: Uploaded images are stored as base64 data in the JSON file

**Production Note**: For best performance, manually save uploaded images to your `images/` or `content/` folder and update the URL reference.

#### Using Library Images

1. Find the image you want to use
2. Click the **"Copy URL"** button
3. Paste the URL into any image field (slider, services, etc.)

#### Deleting Library Images

1. Click the **trash icon** on the image
2. Confirm the deletion
3. The image is removed from the library

---

### Company Information

**Purpose**: Update your company's contact details displayed across the website.

#### Editable Fields

- **Company Name**: Your business name (appears in header/footer)
- **Tagline**: Your company slogan or tagline
- **Phone Number**: Main contact number
  - Format: `(+60)12202-2719`
- **Email Address**: Primary contact email
  - Current: `edgar@fourwindsinternatinal.com`
- **Address**: Physical business address
  - Current: `16-1, Jalan Kasuarina 8, Bandar Botanic, 41200 Klang, Selangor, Malaysia`

#### How to Edit

1. Click in any field and type your changes
2. Ensure phone and email are correctly formatted
3. Click **"Save All Changes"** when done

---

### Home Page Content

#### Hero Section

**Purpose**: The first section visitors see on your homepage.

**Editable Fields:**
- **Hero Title**: Main headline (e.g., "Global Logistics Solutions")
- **Hero Subtitle**: Supporting text explaining your services
- **Call to Action Button Text**: Text on the main CTA button (e.g., "Get a Quote")

#### Removals Solutions Section

**Purpose**: Showcase your core services with icons and descriptions.

**Editable Fields:**
- **Section Title**: Main heading for the services area
- **Section Subtitle**: Brief description of your services

**Service Cards (6 items):**
Each service has:
- **Icon**: Emoji or icon character
- **Title**: Service name
- **Description**: Brief explanation of the service

**Available Services:**
1. International Moving
2. Domestic Moving
3. Household Goods Moving
4. Pet Relocation
5. Cars/Automobile
6. Project Cargo

**Editing Services:**
1. Scroll to the service you want to edit
2. Modify the icon, title, or description
3. Keep descriptions concise (1-2 sentences)
4. Click **"Save All Changes"**

#### Statistics Section

**Purpose**: Display impressive numbers about your company.

**Current Stats:**
- 25+ Years Experience
- 10K+ Shipments Delivered
- 50+ Countries Served
- 98% Customer Satisfaction

**Editing Stats:**
1. Locate the stat you want to edit
2. Update:
   - **Number/Value**: The statistic (e.g., "25+", "10K+")
   - **Label**: What the number represents
3. Use "+" symbols for emphasis (e.g., "50+")
4. Click **"Save All Changes"**

---

### About Us Page

#### Main Content

**Editable Fields:**
- **Page Title**: Main heading (e.g., "About Four Winds Worldwide")
- **Mission Statement**: Your company's mission (2-3 sentences)
- **Our Story**: Company history and background

**Editing the Story:**
- The story field uses pipe symbols `|` to separate paragraphs
- Example: `Paragraph 1 text here|Paragraph 2 text here|Paragraph 3 text here`
- Each section between `|` becomes a separate paragraph on the website

#### Our Values

**Purpose**: Highlight your company's core values.

**Current Values:**
1. Reliability
2. Innovation
3. Customer Focus
4. Global Network

**Editing Values:**
1. Locate the value you want to edit
2. Update:
   - **Title**: Value name
   - **Description**: Explanation of the value
3. Keep descriptions clear and concise
4. Click **"Save All Changes"**

#### Our Team

**Purpose**: Introduce your leadership team to visitors.

**Current Team Members:**
1. **Edgar Stephen Pereira** - Chief Executive Officer
   - 30+ years in International Moving, Project Cargo and Supply Chain Logistics
2. **Jerad Tharmaraj** - Chief Operations Officer
   - Expert in international freight operations and compliance
3. **Michael Rodriguez** - Finance Director
   - Pioneering logistics technology and digital transformation

**Editing Team Members:**
1. Locate the team member you want to edit
2. Update:
   - **Name**: Full name
   - **Position**: Job title
   - **Biography/Description**: Professional background and expertise
3. Keep bios professional but approachable
4. Highlight key achievements and years of experience
5. Click **"Save All Changes"**

---

### Services

**Purpose**: Detailed information about your service offerings.

The services section is managed through the Home - Removals Solutions section (see above). Additional service pages like International Moving, Domestic Moving, Pet Relocation, Cars/Automobile, and Project Cargo are controlled through the `site-content.json` file directly.

---

### Contact Information

**Purpose**: Manage contact page content and office locations.

#### Main Contact Section

**Editable Fields:**
- **Page Title**: Contact page heading
- **Page Subtitle**: Introduction text
- **Office Hours**: Business hours (e.g., "Monday - Friday: 8:00 AM - 6:00 PM")

#### Office Locations

**Purpose**: List multiple office locations with contact details.

**Current Locations:**
1. Main Office - Port City
2. West Coast Hub - Los Angeles
3. East Coast Hub - New York

**Editing Locations:**
1. Locate the location you want to edit
2. Update:
   - **City**: Location name/title
   - **Address**: Full street address
   - **Phone**: Contact number
   - **Email**: Location-specific email
3. Ensure all information is accurate
4. Click **"Save All Changes"**

---

## Saving Changes

### The Save Process

**CRITICAL: Changes are NOT automatically saved!**

#### Step 1: Make Your Edits

- Edit any content across all sections
- You can make multiple changes before saving
- There's no autosave, so be careful not to close the page

#### Step 2: Click "Save All Changes"

1. Click the green **"Save All Changes"** button in the header
2. The system processes all your edits
3. A download dialog will appear

#### Step 3: Download the Updated File

- A file named `site-content.json` will be downloaded
- This file contains all your changes
- Save it to a known location on your computer

#### Step 4: Replace the Original File

**IMPORTANT: This is the most critical step!**

1. Locate the downloaded `site-content.json` file
2. Navigate to the `content/` folder in your website directory
3. **Replace** the existing `site-content.json` with your downloaded file
4. Confirm the replacement

#### Step 5: Verify Changes

1. Click the **"View Website"** button or refresh your website
2. Navigate to the pages you edited
3. Verify your changes appear correctly

#### Step 6: Publish Changes

After replacing the file locally, your changes will be visible on your local website. To publish changes to the live website, contact your technical administrator.

---

## Best Practices

### Content Guidelines

1. **Keep It Concise**
   - Website visitors prefer brief, scannable content
   - Use 1-2 sentences for descriptions
   - Save detailed information for dedicated pages

2. **Be Consistent**
   - Use similar tone and style across all sections
   - Keep formatting consistent (capitalization, punctuation)
   - Maintain brand voice throughout

3. **Proofread**
   - Always review changes before saving
   - Check for spelling and grammar errors
   - Verify phone numbers and email addresses

4. **Test Links**
   - Ensure all URLs work correctly
   - Use proper anchor links (e.g., `#about`, `#services`)
   - Test navigation after publishing

### Image Best Practices

1. **Optimization**
   - Compress images before uploading
   - Target file sizes under 500KB
   - Use WebP format for best compression

2. **Naming**
   - Use descriptive filenames: `office-exterior.jpg` not `IMG_1234.jpg`
   - Use lowercase and hyphens: `team-photo.jpg`
   - Avoid spaces and special characters

3. **Alt Text**
   - Always provide descriptive alt text
   - Helps with SEO and accessibility
   - Example: "Four Winds warehouse facility" not "Image 1"

### Security Best Practices

1. **Password Management**
   - Change the default admin password
   - Use a strong, unique password
   - Don't share credentials

2. **Session Management**
   - Log out when finished
   - Don't leave the dashboard open unattended
   - Sessions expire after 24 hours

3. **Backup**
   - Keep backup copies of `site-content.json`
   - Save dated versions: `site-content-2026-01-30.json`
   - Store backups in a secure location

### Workflow Best Practices

1. **Make a Backup First**
   - Before major edits, download current `site-content.json`
   - Save as backup: `site-content-backup-YYYY-MM-DD.json`
   - If something goes wrong, you can restore

2. **Edit in Batches**
   - Group related changes together
   - Test after each major update
   - Don't make too many changes at once

3. **Test Before Publishing**
   - View changes locally first
   - Check all affected pages
   - Verify on mobile devices

4. **Document Changes**
   - Keep notes of what you changed
   - Maintain a change log for major updates
   - Document the date and purpose of each update

---

## Troubleshooting

### Common Issues and Solutions

#### Problem: Can't Log In

**Symptoms**: Login button doesn't work or shows error

**Solutions:**
1. Verify credentials:
   - Username: `admin`
   - Password: `fourwinds2024`
2. Check caps lock is off
3. Clear browser cache and cookies
4. Try a different browser
5. Check browser console for errors (F12)

---

#### Problem: Changes Not Showing on Website

**Symptoms**: Edited content doesn't appear after saving

**Common Causes and Solutions:**

1. **Didn't Replace the JSON File**
   - Most common issue!
   - Download `site-content.json` from admin
   - Replace file at: `/content/site-content.json`
   - Verify file was actually replaced

2. **Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear browser cache completely
   - Try incognito/private browsing mode

3. **JSON Syntax Error**
   - Invalid JSON prevents content from loading
   - Validate JSON at: https://jsonlint.com/
   - Check for missing commas, quotes, or brackets

---

#### Problem: Image Not Displaying

**Symptoms**: Broken image icon or blank space

**Solutions:**

1. **Check File Path**
   - Verify path is correct: `images/your-image.jpg`
   - Path is case-sensitive: `Images/` ≠ `images/`
   - Use forward slashes: `/` not `\`

2. **Check File Exists**
   - Verify image is actually in the specified folder
   - Check filename matches exactly (case-sensitive)

3. **Check File Format**
   - Use supported formats: JPG, PNG, WebP, GIF
   - Avoid unsupported formats: TIFF, BMP, PSD

4. **Check File Size**
   - Very large files may fail to load
   - Compress images under 2MB

---

#### Problem: Dashboard Looks Broken

**Symptoms**: Layout issues, missing buttons, strange formatting

**Solutions:**

1. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R or Cmd+Shift+R
   - Clear all cached files
   - Restart browser

2. **Check CSS File**
   - Verify `/admin/css/admin.css` exists
   - File shouldn't be modified
   - Restore from backup if necessary

3. **Browser Compatibility**
   - Use modern browser (Chrome, Firefox, Safari, Edge)
   - Update browser to latest version
   - Avoid Internet Explorer

---

#### Problem: Save Button Not Working

**Symptoms**: Clicking save doesn't download file or shows error

**Solutions:**

1. **Check Browser Permissions**
   - Allow downloads in browser settings
   - Disable download blocking extensions
   - Check popup blocker isn't active

2. **JavaScript Errors**
   - Open browser console (F12)
   - Look for red error messages
   - Screenshot errors for troubleshooting

3. **Session Expired**
   - Log out and log back in
   - Session expires after 24 hours
   - Make changes again and save

---

#### Problem: Content Appears Jumbled

**Symptoms**: Text from different sections mixed together, wrong order

**Solutions:**

1. **Check JSON Structure**
   - The JSON file may be corrupted
   - Restore from backup
   - Re-enter content carefully

2. **Paragraph Separators**
   - For "Our Story", use `|` between paragraphs
   - Example: `Para 1|Para 2|Para 3`
   - Don't use `|` inside sentences

---

#### Problem: Can't Delete Item

**Symptoms**: Delete button doesn't work or item reappears

**Solutions:**

1. **Confirm Deletion**
   - Click delete and confirm in popup
   - Wait for item to disappear
   - Click "Save All Changes" button
   - Download and replace JSON file

2. **JavaScript Error**
   - Check browser console for errors
   - Try refreshing and deleting again
   - Log out and back in

---

### Getting Help

If you encounter issues not covered in this guide:

1. **Check Browser Console**
   - Press F12 to open developer tools
   - Look for errors (red text) in Console tab
   - Screenshot any errors

2. **Verify File Structure**
   - Ensure all files are in correct locations
   - Check that folders haven't been renamed
   - Verify permissions allow reading/writing

3. **Restore from Backup**
   - Use a backup copy of `site-content.json`
   - Replace the current file
   - Test again

---

## Quick Reference

### Login Details
- **URL**: `/admin/index.html`
- **Username**: `admin`
- **Password**: `fourwinds2024`
- **Session Duration**: 24 hours

### File Locations
- **Admin Dashboard**: `/admin/dashboard.html`
- **Content File**: `/content/site-content.json`
- **Images Folder**: `/images/` and `/content/`

### Important Reminders
1. Always **Save All Changes** before leaving
2. Always **Replace** the JSON file after saving
3. Always **Test** changes before publishing
4. Always **Backup** before major edits
5. Always **Log out** when finished

---

## Version History

- **v2.0** (January 30, 2026) - Removed technical deployment instructions and support contacts
- **v1.0** (January 30, 2026) - Initial guide creation

---

**End of Guide**

Thank you for using the Four Winds Worldwide Admin Dashboard!