# Webinar Modal - Clean Code Blocks for Copy/Paste

Choose your version and copy the code blocks below.

---

## 🚀 VERSION 1: With 1.5 Second Delay (Recommended)

### HTML Code Block
```html
<!-- Overlay -->
<div class="webinar-overlay" id="webinarOverlay" onclick="closeWebinarModal()"></div>

<!-- Modal -->
<div class="webinar-modal" id="webinarModal">
    <!-- Close Button -->
    <button class="webinar-close" onclick="closeWebinarModal()" aria-label="Close">
        ×
    </button>
    
    <!-- Poster Image -->
    <img 
        src="/webinar.jpg" 
        alt="Webinar Announcement" 
        class="webinar-poster"
    >
    
    <!-- Call to Action Buttons -->
    <div class="webinar-actions">
        <a 
            href="https://forms.gle/whaTsGAPppdkLxRf8" 
            target="_blank" 
            rel="noopener noreferrer"
            class="webinar-btn webinar-btn-primary"
        >
            Register Now
        </a>
        <button 
            onclick="closeWebinarModal()" 
            class="webinar-btn webinar-btn-secondary"
        >
            Close
        </button>
    </div>
</div>
```

### CSS Code Block
```css
/* Overlay Background */
.webinar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 9998;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.webinar-overlay.active {
    display: block;
    opacity: 1;
}

/* Modal Container */
.webinar-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    max-width: 600px;
    width: 90%;
    background: white;
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: none;
    opacity: 0;
    transition: all 0.3s ease;
    padding: 24px;
}

.webinar-modal.active {
    display: block;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}

/* Close Button */
.webinar-close {
    position: absolute;
    top: -12px;
    right: -12px;
    width: 40px;
    height: 40px;
    background: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #374151;
    transition: all 0.2s ease;
    z-index: 10000;
}

.webinar-close:hover {
    background: #f3f4f6;
    color: #ef4444;
    transform: scale(1.1);
}

/* Poster Image */
.webinar-poster {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    display: block;
    max-height: 80vh;
    object-fit: contain;
}

/* Call to Action Buttons */
.webinar-actions {
    margin-top: 24px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

.webinar-btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.webinar-btn-primary {
    background: #10b981;
    color: white;
    box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
}

.webinar-btn-primary:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(16, 185, 129, 0.4);
}

.webinar-btn-secondary {
    background: #f3f4f6;
    color: #374151;
}

.webinar-btn-secondary:hover {
    background: #e5e7eb;
}

/* Mobile Responsive */
@media (max-width: 640px) {
    .webinar-modal {
        width: 95%;
        padding: 16px;
        max-height: 95vh;
        overflow-y: auto;
    }
    
    .webinar-close {
        top: -8px;
        right: -8px;
        width: 36px;
        height: 36px;
    }
    
    .webinar-actions {
        flex-direction: column;
    }
    
    .webinar-btn {
        width: 100%;
    }
}

/* Prevent body scroll when modal is open */
body.modal-open {
    overflow: hidden;
}
```

### JavaScript Code Block
```javascript
// Configuration
const MODAL_DELAY = 1500; // Delay in milliseconds (1500 = 1.5 seconds)
const SESSION_STORAGE_KEY = 'hasSeenWebinarModal';

// Show Modal Function
function showWebinarModal() {
    const hasSeenModal = sessionStorage.getItem(SESSION_STORAGE_KEY);
    
    // Only show if user hasn't seen it in this session
    if (!hasSeenModal) {
        setTimeout(() => {
            const overlay = document.getElementById('webinarOverlay');
            const modal = document.getElementById('webinarModal');
            
            if (overlay && modal) {
                overlay.classList.add('active');
                modal.classList.add('active');
                document.body.classList.add('modal-open');
            }
        }, MODAL_DELAY);
    }
}

// Close Modal Function
function closeWebinarModal() {
    const overlay = document.getElementById('webinarOverlay');
    const modal = document.getElementById('webinarModal');
    
    if (overlay && modal) {
        overlay.classList.remove('active');
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    }
}

// Close modal when ESC key is pressed
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeWebinarModal();
    }
});

// Initialize modal when page loads
window.addEventListener('load', showWebinarModal);
```

---

## ⚡ VERSION 2: Instant (No Delay)

### JavaScript Code Block (Replace the one above)
```javascript
// Configuration
const SESSION_STORAGE_KEY = 'hasSeenWebinarModal';

// Show Modal Function - INSTANT VERSION
function showWebinarModal() {
    const hasSeenModal = sessionStorage.getItem(SESSION_STORAGE_KEY);
    
    if (!hasSeenModal) {
        // Show immediately - no setTimeout delay
        const overlay = document.getElementById('webinarOverlay');
        const modal = document.getElementById('webinarModal');
        
        if (overlay && modal) {
            overlay.classList.add('active');
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        }
    }
}

// Close Modal Function
function closeWebinarModal() {
    const overlay = document.getElementById('webinarOverlay');
    const modal = document.getElementById('webinarModal');
    
    if (overlay && modal) {
        overlay.classList.remove('active');
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    }
}

// Close modal when ESC key is pressed
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeWebinarModal();
    }
});

// Initialize modal immediately when DOM is ready
document.addEventListener('DOMContentLoaded', showWebinarModal);
```

**HTML and CSS remain the same as Version 1**

---

## 🎨 VERSION 3: Minimal (Image Only, No Buttons)

### HTML Code Block
```html
<!-- Overlay -->
<div class="webinar-overlay" id="webinarOverlay" onclick="closeWebinarModal()"></div>

<!-- Modal -->
<div class="webinar-modal webinar-modal-minimal" id="webinarModal">
    <!-- Close Button -->
    <button class="webinar-close" onclick="closeWebinarModal()" aria-label="Close">
        ×
    </button>
    
    <!-- Poster Image Only -->
    <img 
        src="/webinar.jpg" 
        alt="Webinar Announcement" 
        class="webinar-poster"
    >
</div>
```

### Additional CSS for Minimal Version
```css
/* Add this to your existing CSS */
.webinar-modal-minimal {
    padding: 0;
    background: transparent;
    box-shadow: none;
}

.webinar-modal-minimal .webinar-poster {
    border: 4px solid white;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
```

**JavaScript remains the same as Version 1**

---

## 📋 Installation Instructions

### Step 1: Add HTML
Place the HTML code just before your closing `</body>` tag:

```html
    <!-- Your existing content -->
    
    <!-- WEBINAR MODAL - Add this before </body> -->
    <div class="webinar-overlay" id="webinarOverlay" onclick="closeWebinarModal()"></div>
    <div class="webinar-modal" id="webinarModal">
        <!-- Modal content here -->
    </div>
    
</body>
```

### Step 2: Add CSS
Add the CSS to your stylesheet or in a `<style>` tag in your `<head>`:

```html
<head>
    <!-- Your existing head content -->
    
    <style>
        /* Paste the CSS code here */
    </style>
</head>
```

### Step 3: Add JavaScript
Add the JavaScript before closing `</body>` tag or in a separate `.js` file:

```html
    <!-- Modal HTML here -->
    
    <script>
        /* Paste the JavaScript code here */
    </script>
    
</body>
```

### Step 4: Add Your Image
Make sure `webinar.jpg` is in your website's root directory or update the image path in the HTML.

---

## ⚙️ Quick Customizations

### Change Delay Time
In JavaScript, modify this line:
```javascript
const MODAL_DELAY = 1500; // Change to desired milliseconds
```

**Examples:**
- `500` = 0.5 seconds
- `1000` = 1 second  
- `2000` = 2 seconds
- `3000` = 3 seconds

### Change Registration Link
In HTML, modify the href:
```html
<a href="YOUR_REGISTRATION_LINK_HERE" ...>
```

### Change Modal Size
In CSS, modify max-width:
```css
.webinar-modal {
    max-width: 600px; /* Change to 500px, 700px, 800px, etc. */
}
```

### Change Overlay Darkness
In CSS, modify background opacity:
```css
.webinar-overlay {
    background: rgba(0, 0, 0, 0.6); /* 0.6 = 60% dark, try 0.4-0.8 */
}
```

### Disable Session Storage (Show Every Time)
In JavaScript, remove the session storage checks:

```javascript
function showWebinarModal() {
    // Remove session storage check - always show
    setTimeout(() => {
        const overlay = document.getElementById('webinarOverlay');
        const modal = document.getElementById('webinarModal');
        
        if (overlay && modal) {
            overlay.classList.add('active');
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        }
    }, 1500);
}

function closeWebinarModal() {
    const overlay = document.getElementById('webinarOverlay');
    const modal = document.getElementById('webinarModal');
    
    if (overlay && modal) {
        overlay.classList.remove('active');
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        // Remove sessionStorage line
    }
}
```

---

## 🔍 Testing

1. **Clear session storage**: Open browser console and run:
   ```javascript
   sessionStorage.clear()
   ```

2. **Reload page**: The modal should appear after the delay

3. **Test close button**: Click X or outside modal

4. **Test responsive**: Resize browser window or test on mobile

---

## 📱 Browser Support

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Internet Explorer 11+ (with slight styling differences)

---

## 🎯 Features Summary

### All Versions Include:
- ✨ Smooth fade-in animation
- 📱 Fully responsive
- 🎯 Auto-centers
- 🌑 Dark overlay with blur
- ❌ Close button
- 🖱️ Click outside to close
- ⌨️ ESC key to close
- 💾 Session storage (once per session)
- 🎭 Professional shadows
- 🔲 Rounded corners

---

Need help? Check the full documentation in `WEBINAR_MODAL_GUIDE.md`

