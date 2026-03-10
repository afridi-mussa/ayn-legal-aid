# Webinar Modal Popup - Implementation Guide

This guide explains how to use the webinar announcement modal on your Ayn Legal Aid website.

## 📋 Overview

Three versions of the modal are available:

1. **`WebinarModal`** (Default) - Shows after 1.5 seconds with CTA buttons
2. **`WebinarModalInstant`** - Shows immediately with CTA buttons
3. **`WebinarModalMinimal`** - Shows after 1.5 seconds, image only (no CTA buttons)

## ✅ Current Setup

The modal is already integrated in your website at `app/layout.tsx`.

Currently using: **`WebinarModal`** (1.5 second delay version)

## 🔄 How to Switch Versions

### Option 1: Use the Instant Version (No Delay)

In `app/layout.tsx`, change the import:

```typescript
// Change this:
import { WebinarModal } from "@/components/webinar-modal"

// To this:
import { WebinarModal } from "@/components/webinar-modal-instant"
```

### Option 2: Use the Minimal Version (Image Only)

In `app/layout.tsx`, change the import:

```typescript
// Change this:
import { WebinarModal } from "@/components/webinar-modal"

// To this:
import { WebinarModal } from "@/components/webinar-modal-minimal"
```

## 🎨 Features

### All Versions Include:

- ✨ Smooth fade-in animation
- 📱 Fully responsive (mobile & desktop)
- 🎯 Auto-centers on screen
- 🌑 Dark overlay background with blur effect
- ❌ Close button (top-right)
- 🔒 Click outside to close
- 💾 Session storage (only shows once per session)
- 🎭 Professional shadow effects
- 🔲 Rounded corners

### Default & Instant Versions Also Include:

- 🔘 "Register Now" button (links to registration form)
- 🔘 "Close" button

## ⚙️ Customization Options

### Change Delay Time

Edit `components/webinar-modal.tsx`, line 15:

```typescript
// Default is 1500ms (1.5 seconds)
setTimeout(() => {
  setIsOpen(true)
  setTimeout(() => setIsVisible(true), 50)
}, 1500) // Change this number

// Examples:
// 500   = 0.5 seconds
// 1000  = 1 second
// 2000  = 2 seconds
// 3000  = 3 seconds
```

### Change Image

Replace `/public/webinar.jpg` with your new poster image, or update the path in the component:

```typescript
<Image
  src="/webinar.jpg"  // Change this path
  alt="Webinar Announcement"
  fill
  className="object-cover"
  priority
/>
```

### Change Registration Link

Edit the registration button URL in the component:

```typescript
<a
  href="https://forms.gle/whaTsGAPppdkLxRf8"  // Change this URL
  target="_blank"
  rel="noopener noreferrer"
>
  Register Now
</a>
```

### Change Modal Size

In the modal container div, modify the `max-w-` class:

```typescript
// Current: max-w-2xl (672px)
<div className="... max-w-2xl ...">

// Options:
// max-w-xl   = 576px (smaller)
// max-w-2xl  = 672px (current)
// max-w-3xl  = 768px (larger)
// max-w-4xl  = 896px (extra large)
```

### Change Image Aspect Ratio

Modify the `aspect-[3/4]` class:

```typescript
// Current: aspect-[3/4] (portrait)
<div className="... aspect-[3/4] ...">

// Options:
// aspect-square     = 1:1 (square)
// aspect-video      = 16:9 (landscape)
// aspect-[4/3]      = 4:3
// aspect-[3/4]      = 3:4 (current - portrait)
// aspect-[9/16]     = 9:16 (vertical video)
```

### Change Overlay Darkness

Modify the overlay opacity:

```typescript
// Current: bg-black/60 (60% dark)
<div className="... bg-black/60 ...">

// Options:
// bg-black/40  = Lighter overlay
// bg-black/50  = Medium overlay
// bg-black/60  = Current setting
// bg-black/70  = Darker overlay
// bg-black/80  = Very dark overlay
```

## 🚫 Temporarily Disable Modal

### Method 1: Comment out in layout

In `app/layout.tsx`:

```typescript
<Suspense fallback={null}>{children}</Suspense>
{/* <WebinarModal /> */}  {/* Temporarily disabled */}
<Analytics />
```

### Method 2: Remove entirely

In `app/layout.tsx`:

```typescript
// Remove or comment out this import:
// import { WebinarModal } from "@/components/webinar-modal"

// Remove this line from the JSX:
// <WebinarModal />
```

## 🔄 Show Modal Again After User Closes

The modal uses `sessionStorage` which resets when the browser is closed. To show it again:

### Option 1: Clear Session Storage (Testing)

Open browser console and run:
```javascript
sessionStorage.removeItem("hasSeenWebinarModal")
```

### Option 2: Change to Show Every Page Load

Edit the modal component and remove the session storage check:

```typescript
useEffect(() => {
  // Remove these lines:
  // const hasSeenModal = sessionStorage.getItem("hasSeenWebinarModal")
  // if (!hasSeenModal) {
  
  // Always show the modal:
  const timer = setTimeout(() => {
    setIsOpen(true)
    setTimeout(() => setIsVisible(true), 50)
  }, 1500)

  return () => clearTimeout(timer)
  // } // Remove this closing brace too
}, [])
```

And remove the sessionStorage set in handleClose:

```typescript
const handleClose = () => {
  setIsVisible(false)
  setTimeout(() => {
    setIsOpen(false)
    // Remove this line:
    // sessionStorage.setItem("hasSeenWebinarModal", "true")
  }, 300)
}
```

## 📱 Mobile Optimization

The modal is fully responsive. To adjust mobile-specific styles:

```typescript
// Example: Make modal smaller on mobile
<div className="max-w-2xl sm:max-w-3xl w-full">
              ↑              ↑
         mobile size    desktop size
```

## 🎯 Best Practices

1. **Image Size**: Optimize your webinar.jpg image (recommended: max 500KB, 1200px width)
2. **Delay**: 1.5-2 seconds is optimal for user experience
3. **Session Storage**: Prevents annoying users by showing modal only once per session
4. **Accessibility**: Keep the close button easily clickable

## 📝 File Structure

```
components/
├── webinar-modal.tsx           (Default - 1.5s delay with CTA)
├── webinar-modal-instant.tsx   (Instant with CTA)
└── webinar-modal-minimal.tsx   (1.5s delay, no CTA)

public/
└── webinar.jpg                 (Your poster image)

app/
└── layout.tsx                  (Where modal is imported)
```

## 🐛 Troubleshooting

### Modal not showing?
- Check if `webinar.jpg` exists in `/public` folder
- Open browser console for errors
- Clear session storage: `sessionStorage.clear()`
- Refresh the page

### Modal shows every time?
- Session storage is working correctly - it resets when browser closes
- If you want it to persist across browser sessions, use `localStorage` instead

### Image not loading?
- Verify image path is `/webinar.jpg`
- Check image file name is exactly `webinar.jpg` (case-sensitive)
- Try hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

## 💡 Tips

- Test on mobile devices to ensure good UX
- Keep registration form link up to date
- Consider A/B testing different delay times
- Monitor conversion rates on registration form

---

Need more help? Check the component files directly for inline comments and customization options.

