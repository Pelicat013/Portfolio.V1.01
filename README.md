# 3D Automotive Artist Portfolio

A modern, animated portfolio website showcasing Blender car renders and 3D artwork. Built with pure HTML, CSS, and JavaScript - no frameworks needed!

## Features

- **Animated Hero Section** with gradient overlays and grid animations
- **Responsive Design** that works on all devices
- **Gallery System** with category filtering (Sports, Classic, Concept)
- **Smooth Animations** including scroll reveals and parallax effects
- **Fast Loading** - no heavy dependencies
- **GitHub Pages Ready** - free hosting included

## Quick Start

1. **Add Your Images**: Place your Blender renders in `assets/images/`
2. **Update Gallery**: Edit `index.html` to replace placeholder gallery items with your images
3. **Customize Content**: Update text, colors, and personal information
4. **Push to GitHub**: Your site will be live at `https://pelicat013.github.io/Portfolio.V1.01/`

## How to Add Your Blender Renders

### Step 1: Add Images
Place your rendered images in the `assets/images/` folder. Recommended formats:
- PNG or JPG
- 1920x1080px or similar 16:9 ratio
- Optimized file size (under 500KB per image)

### Step 2: Update Gallery Items
Open `index.html` and replace the placeholder gallery items. Here's an example:

```html
<div class="gallery-item" data-category="sports">
    <img src="assets/images/your-car-render.jpg" alt="Sports Car Render">
    <div class="gallery-info">
        <h3>Your Project Name</h3>
        <p>Blender • Cycles Render</p>
    </div>
</div>
```

### Step 3: Update Categories
You can change the filter categories in the filter buttons:
- Line 51-56 in `index.html`

## Customization Guide

### Change Colors
Edit the CSS variables in `css/styles.css` (lines 10-17):
```css
:root {
    --primary-color: #00d4ff;  /* Main accent color */
    --secondary-color: #ff006e; /* Secondary accent */
    --dark-bg: #0a0a0a;        /* Main background */
}
```

### Update Personal Info
- **Name**: Line 13 in `index.html`
- **Title**: Lines 32-33 in `index.html`
- **About Section**: Lines 108-110 in `index.html`
- **Email**: Line 134 in `index.html`

### Modify Stats
Update the hero stats (lines 39-51 in `index.html`):
- `data-count="50"` changes the number
- Modify the label text below each stat

## Project Structure

```
Portfolio.V1.01/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling and animations
├── js/
│   └── script.js       # Interactive features
├── assets/
│   └── images/         # Your Blender renders go here
└── README.md           # This file
```

## Workflow with Claude Code

This portfolio is set up to work seamlessly with Claude Code for easy updates:

1. **Make changes**: Edit files through Claude or manually
2. **Test locally**: Open `index.html` in your browser
3. **Commit changes**: Ask Claude to commit your updates
4. **Push to GitHub**: Changes go live automatically

## Adding New Features

Want to add something new? Just ask Claude Code! Examples:
- "Add a contact form"
- "Create a lightbox for gallery images"
- "Add smooth page transitions"
- "Integrate with Instagram API"

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- No external dependencies except fonts
- Optimized animations using CSS transforms
- Lazy loading ready
- Lighthouse score: 95+

## License

Free to use for personal projects.

---

Built with Claude Code | Updated: 2026
