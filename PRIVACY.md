# Portfolio Privacy Guide

## Understanding Public vs Private

This portfolio uses a **public GitHub repository** to enable free hosting with GitHub Pages.

### What This Means

**Public Repository = Free Website Hosting**
- GitHub Pages is free for public repositories
- Private repos require GitHub Pro ($4/month)

---

## What's Public (Visible to Everyone)

### On GitHub Repository
Anyone can view at `https://github.com/Pelicat013/Portfolio.V1.01`:

✅ **Source Code**
- HTML, CSS, JavaScript files
- Structure and design of the website

✅ **Published Images**
- All images in `assets/images/` (except private folder)
- Can be downloaded at full resolution

✅ **Documentation**
- README.md
- HOW-TO-ADD-IMAGES.md
- WORKFLOW.md
- This PRIVACY.md file

✅ **Commit History**
- What changes were made and when
- Commit messages

### On the Live Website
Anyone can view at `https://pelicat013.github.io/Portfolio.V1.01/`:

✅ **Portfolio Content**
- Project showcases
- Skills section
- About information
- Contact email (pelicat013@gmail.com)

---

## What's Private (Local Only)

These files are **NOT uploaded to GitHub**:

🔒 **private/ folder**
- SKILLS_CONTEXT.md (equipment list, detailed skills)
- Any other sensitive files you add

🔒 **Files in .gitignore**
- Editor settings (.vscode, .idea)
- Environment variables (.env)
- Backup files (*.bak, *.tmp)
- Any file matching patterns in `.gitignore`

🔒 **Local Drafts**
- Anything in `private/` or `drafts/` folders
- Files ending in `.private.md`

---

## What People Can Do

### ✅ Can Do (Normal for Public Repos)
- View your code
- Download your images
- See your commit history
- Clone/fork the repository
- Learn from your code
- Use your design as inspiration

### ❌ Cannot Do
- Edit your repository
- Access your private folder
- See files in `.gitignore`
- Change your website
- Access your local computer
- See SKILLS_CONTEXT.md (now private)

---

## Privacy Best Practices

### Before Uploading Images

**Think twice about:**
- Photos with visible personal information (addresses, documents)
- Images containing sensitive equipment serial numbers
- Screenshots with private data visible
- Original high-res files with metadata

**Recommended:**
- Use web-optimized versions (lower resolution)
- Remove EXIF metadata from photos
- Crop out sensitive information
- Keep originals in `private/` folder

### Information to Keep Private

**Never commit:**
- Passwords or API keys
- Personal addresses or phone numbers (beyond what's on website)
- Financial information
- Client/proprietary data
- Equipment serial numbers or purchase prices
- Private communications

**Use `private/` folder for:**
- Detailed equipment inventories
- Personal project notes
- Client information
- Draft content
- Sensitive documentation

---

## How Your Privacy is Protected

### .gitignore Protection
Files and folders listed in `.gitignore` are automatically excluded from GitHub.

**Currently Protected:**
```
private/                  # Your private folder
SKILLS_CONTEXT.md        # Detailed skills/equipment
*.private.md             # Any file ending in .private.md
credentials/             # Any credentials folder
equipment-inventory/     # Equipment lists
notes/                   # Personal notes
drafts/                  # Draft content
```

### What You Can Share Safely

**Safe to make public:**
- Finished project images
- Polished renders and designs
- Code and technical implementations
- Professional contact information
- Skills and capabilities (general)
- Project descriptions

**Keep private:**
- Equipment values and serial numbers
- Detailed personal information
- Work-in-progress drafts
- Client-specific details

---

## Using Claude Code with Private Files

**Good news:** Claude Code can read files in `private/` for context without publishing them!

### Example Workflow

1. **Store reference in private:**
   ```
   private/SKILLS_CONTEXT.md  ← Your detailed info
   ```

2. **Ask Claude to use it:**
   ```
   "Update my skills section based on private/SKILLS_CONTEXT.md"
   ```

3. **Claude reads private file** → Updates public files → Only public changes committed

**Result:** Your detailed info stays private, but the website gets updated!

---

## If You Need Full Privacy

### Option 1: GitHub Pro ($4/month)
- Make repository private
- Keep GitHub Pages enabled
- Costs $4/month
- Complete privacy for code/files

### Option 2: Alternative Hosting
- Use Netlify (free, supports private repos)
- Use Vercel (free, supports private repos)
- Self-host on your own server

### Option 3: Current Setup (Recommended)
- Keep repo public for free hosting
- Use `private/` folder for sensitive files
- Only upload web-ready, public-safe content
- Best balance of free hosting + privacy

---

## Quick Privacy Checklist

Before committing files:

- [ ] No sensitive personal information?
- [ ] No equipment serial numbers or values?
- [ ] No passwords or credentials?
- [ ] Images don't reveal private information?
- [ ] Comfortable with this being public forever?
- [ ] Would I put this on my resume?

If unsure → Put it in `private/` folder!

---

## Questions?

### "Can people steal my code?"
- Technically yes, but it's just HTML/CSS/JS
- This is normal for web portfolios
- Your unique content (images, projects) is what matters
- Code is easy to copy, creativity is not

### "Can people download my images?"
- Yes, from the repository and website
- This is normal for online portfolios
- Watermark important images if concerned
- Keep originals in `private/` folder

### "What if I accidentally commit something private?"
- Tell Claude Code immediately: "Remove [file] from git history"
- Or manually: `git rm --cached [file]` and add to `.gitignore`
- Past commits may still show it (requires force push to remove)

### "How do I check what's public?"
- Visit: `https://github.com/Pelicat013/Portfolio.V1.01`
- Everything you see there is public
- Files in `private/` won't be there

---

## Summary

**Public:** Website, code, published images, documentation
**Private:** `private/` folder, `.gitignore` files, local drafts

**Safe:** Finished projects, professional info, web-optimized images
**Keep Private:** Equipment details, personal notes, sensitive data

**Your current setup balances free hosting with privacy protection!**

---

Last updated: 2026-01-08
