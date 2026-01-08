# How to Add Images to Your Portfolio

## The Simple Way (Recommended for Beginners)

### Step 1: Add Your Images to the Right Folder

Your portfolio has organized folders for different types of projects:

```
assets/images/
├── aerospace/      ← Drone projects, VTOL designs, flight systems
├── cad/            ← SolidWorks models, CAD designs, technical drawings
├── renders/        ← Blender renders, 3D visualizations
├── media/          ← Video thumbnails, graphics, content production work
└── automation/     ← Data dashboards, scripts, automation screenshots
```

**Simply drag and drop your images into the appropriate folder!**

Supported formats: JPG, JPEG, PNG, GIF, WEBP

### Step 2: Run the Update Script

Open your WSL terminal and run:

```bash
cd /mnt/c/Users/dwjoh/Dropbox/01.AI.Folder/Projects/Portfolio.V1.01
bash update-gallery.sh
```

This script will:
- Scan all your image folders
- Automatically generate titles from filenames
- Update the gallery data file
- Show you a summary of what was found

### Step 3: Commit and Push

Ask Claude Code to commit and push your changes:

```
"Commit and push the new images to GitHub"
```

Or do it manually:

```bash
git add .
git commit -m "Add new project images"
git push
```

**That's it!** Your website will update automatically in 1-2 minutes.

---

## File Naming Tips

Your filenames will automatically become titles, so name them descriptively:

**Good filenames:**
- `vtol-drone-flight-test.jpg` → "Vtol Drone Flight Test"
- `solidworks-wing-assembly.png` → "Solidworks Wing Assembly"
- `blender-car-render-final.jpg` → "Blender Car Render Final"

**Avoid:**
- `IMG_1234.jpg` → "Img 1234" (not descriptive)
- `untitled.png` → "Untitled" (not helpful)

---

## Advanced: Manual Control

If you want more control over titles and descriptions, edit `js/gallery-data.js`:

```javascript
const galleryData = {
    aerospace: [
        {
            file: 'vtol-drone.jpg',
            title: 'ProjScarecrow VTOL',
            description: 'Fixed-wing VTOL • 3D Printed'
        }
    ],
    cad: [
        {
            file: 'wing-design.jpg',
            title: 'Modular Wing Assembly',
            description: 'SolidWorks • Carbon Fiber'
        }
    ]
};
```

Then skip the update script and commit directly.

---

## Folder-Specific Instructions

### Aerospace Projects (`assets/images/aerospace/`)
Perfect for:
- Drone builds and flight tests
- VTOL platform designs
- FPV system setups
- Structural designs
- Assembly photos

### CAD Designs (`assets/images/cad/`)
Perfect for:
- SolidWorks screenshots
- Technical drawings
- 3D-printed parts
- Assembly views
- Exploded diagrams

### 3D Renders (`assets/images/renders/`)
Perfect for:
- Blender visualizations
- Product renders
- Concept art
- Photorealistic renders
- Animation stills

### Media Production (`assets/images/media/`)
Perfect for:
- Video thumbnails
- YouTube banners
- Edited content samples
- Graphics and illustrations
- Before/after editing comparisons

### Automation & Data (`assets/images/automation/`)
Perfect for:
- Data visualization screenshots
- Dashboard designs
- Script outputs
- Golf analytics
- Automated reports

---

## Hero Background Image (Optional)

To add a custom hero background:

1. Add your image to `assets/images/hero/`
2. Ask Claude Code: "Add my hero background image"

Or edit `css/styles.css` manually:

```css
.hero-background {
    background-image: url('../assets/images/hero/your-image.jpg');
    background-size: cover;
    background-position: center;
}
```

---

## Troubleshooting

### Images not showing up?

1. **Check file names**: No spaces or special characters (use `-` or `_`)
2. **Check file format**: Must be JPG, PNG, GIF, or WEBP
3. **Run update script**: `bash update-gallery.sh`
4. **Check console**: Open browser DevTools (F12) and look for errors

### Images too large?

Optimize your images before uploading:
- Recommended size: 1920×1080px or smaller
- File size: Under 500KB per image
- Use PNG for graphics, JPG for photos

Ask Claude Code: "Help me optimize my images for web"

---

## Quick Reference Commands

### View current images
```bash
ls -la assets/images/aerospace/
ls -la assets/images/cad/
ls -la assets/images/renders/
```

### Update gallery
```bash
bash update-gallery.sh
```

### Commit changes
```bash
git add .
git commit -m "Add new images"
git push
```

### Check website status
```bash
gh api repos/Pelicat013/Portfolio.V1.01/pages
```

---

## Examples

### Adding a Drone Photo

```bash
# 1. Copy your image
cp ~/Pictures/scarecrow-vtol.jpg assets/images/aerospace/

# 2. Update gallery
bash update-gallery.sh

# 3. Commit
git add .
git commit -m "Add ProjScarecrow VTOL photo"
git push
```

### Adding Multiple CAD Images

```bash
# 1. Copy all at once
cp ~/CAD_Screenshots/*.png assets/images/cad/

# 2. Update gallery
bash update-gallery.sh

# 3. Check what was added
cat js/gallery-data.js

# 4. Commit
git add .
git commit -m "Add SolidWorks CAD designs"
git push
```

---

## Pro Tips

1. **Consistent naming**: Use lowercase with hyphens (`project-name-v2.jpg`)
2. **Organize by project**: Group related images with similar prefixes
3. **Test locally first**: Open `index.html` in browser before pushing
4. **Use descriptive names**: They become your image titles
5. **Backup originals**: Keep high-res versions in Dropbox

---

## Need Help?

Just ask Claude Code:

- "Add these 5 drone images to my portfolio"
- "Help me organize my CAD screenshots"
- "How do I add a project description to this image?"
- "Resize these images for faster loading"

Claude can help with everything from image optimization to custom gallery layouts!

---

Last updated: 2026-01-08
