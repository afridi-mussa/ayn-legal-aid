# Hostinger Shared Hosting Deployment Guide

## Prerequisites
- Hostinger shared hosting account
- Access to Hostinger File Manager or FTP
- Node.js installed on your local machine (for building)

## Step-by-Step Deployment Process

### Step 1: Download and Setup Project
1. Click the three dots (⋯) in the top-right corner of v0
2. Select "Download ZIP"
3. Extract the downloaded file to your computer
4. Open terminal/command prompt in the extracted folder

### Step 2: Install Dependencies and Build
\`\`\`bash
# Install dependencies
npm install

# Build the static site
npm run build
\`\`\`

This will create an `out` folder containing your static website files.

### Step 3: Prepare Files for Upload
1. Navigate to the `out` folder created after building
2. Select ALL files and folders inside the `out` directory
3. Create a ZIP file containing all these files (not the `out` folder itself, just its contents)

### Step 4: Upload to Hostinger

#### Option A: Using Hostinger File Manager (Recommended)
1. Log into your Hostinger control panel
2. Go to "File Manager"
3. Navigate to the `public_html` folder
4. Delete any existing files in `public_html` (if this is a new site)
5. Upload your ZIP file to `public_html`
6. Right-click the ZIP file and select "Extract"
7. Delete the ZIP file after extraction
8. Ensure all files are directly in `public_html` (not in a subfolder)

#### Option B: Using FTP Client
1. Use an FTP client like FileZilla
2. Connect to your Hostinger hosting using FTP credentials
3. Navigate to the `public_html` directory
4. Upload all files from the `out` folder directly to `public_html`

### Step 5: Verify Deployment
1. Visit your domain name in a browser
2. Check that all pages load correctly:
   - Homepage (/)
   - About (/about)
   - Services (/services)
   - Ambassadors (/ambassadors)
   - Contact (/contact)

## Important Notes

### What Works on Shared Hosting:
✅ Static pages and navigation
✅ Contact information and mailto links
✅ External links (Google Forms, LinkedIn)
✅ Responsive design and animations
✅ All styling and images

### What's Been Simplified for Shared Hosting:
- Contact form now uses mailto links instead of server processing
- No server-side API routes (not supported on shared hosting)
- Static export configuration enabled
- All images optimized for static hosting

### Troubleshooting

**If pages don't load:**
- Ensure all files are in `public_html` root, not in a subfolder
- Check that `index.html` exists in `public_html`
- Verify file permissions are set correctly (755 for folders, 644 for files)

**If images don't show:**
- Check that the `images` folder is uploaded correctly
- Verify image file names match exactly (case-sensitive)

**If styling looks broken:**
- Ensure `_next` folder is uploaded completely
- Check that CSS files are in the correct location

### Domain Configuration
- Your site will be accessible at your domain (e.g., `yourdomain.com`)
- No additional configuration needed for Hostinger shared hosting
- SSL certificate will be automatically applied by Hostinger

## Contact Information
If you need help with deployment, the contact section includes:
- Direct email links (info@aynlegalaid.com, support@aynlegalaid.com)
- Phone numbers with click-to-call functionality
- Links to Google Forms and LinkedIn

## File Structure After Upload
\`\`\`
public_html/
├── index.html
├── about.html
├── services.html
├── ambassadors.html
├── contact.html
├── _next/
│   ├── static/
│   └── ...
├── images/
│   ├── ayn-logo.png
│   └── ...
└── ...
