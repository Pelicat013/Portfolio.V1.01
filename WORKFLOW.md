# Portfolio Workflow Guide

## Your Portfolio is Live! 🎉

**Website URL**: https://pelicat013.github.io/Portfolio.V1.01/

**Repository**: https://github.com/Pelicat013/Portfolio.V1.01

## How to Update Your Portfolio with Claude Code

You're all set up! Here's how to work with Claude Code to update and improve your portfolio.

### Basic Workflow

1. **Open Claude Code** in your terminal
2. **Navigate to your portfolio**:
   ```bash
   cd /mnt/c/Users/dwjoh/Dropbox/01.AI.Folder/Projects/Portfolio.V1.01
   ```
3. **Chat with Claude** to make changes
4. **Push to GitHub** when ready

### Example Requests You Can Make

#### Adding Your Blender Renders
```
"I have 5 car renders I want to add to the gallery. They're located at [path].
Can you help me add them to the portfolio?"
```

#### Customizing Design
```
"Change the primary color scheme to red and black to match my car theme"
```

```
"Add a smooth fade-in animation when the gallery loads"
```

#### Adding Features
```
"Add a lightbox modal so when users click a gallery image, it opens in full screen"
```

```
"Create a contact form that sends emails to me"
```

```
"Add a skills progress bar section showing my Blender proficiency"
```

#### Content Updates
```
"Update my about section with this text: [your text]"
```

```
"Change the hero title to 'Automotive 3D Visualization Specialist'"
```

### Committing and Pushing Changes

After Claude makes changes, you can ask:

```
"Commit these changes and push to GitHub"
```

Claude will:
1. Stage all changes
2. Create a descriptive commit message
3. Push to your repository
4. Your website updates automatically (takes 1-2 minutes)

### Testing Changes Locally

Before pushing, you can preview changes:

1. **Open in Browser**: Right-click `index.html` → Open with → Your browser
2. **Or use Live Server** in VSCode (install Live Server extension)

### File Structure Reference

```
Portfolio.V1.01/
├── index.html          # Main page - structure and content
├── css/styles.css      # All styling and animations
├── js/script.js        # Interactive features
├── assets/images/      # Put your Blender renders here
├── README.md           # Project documentation
└── WORKFLOW.md         # This file
```

### Quick Reference: What to Edit

| What You Want to Change | File to Edit | Lines |
|------------------------|--------------|-------|
| Hero title | index.html | 32-33 |
| Colors | css/styles.css | 10-17 |
| Gallery items | index.html | 62-95 |
| About text | index.html | 108-110 |
| Stats numbers | index.html | 39-51 |
| Email address | index.html | 134 |

### Common Tasks

#### Adding a New Gallery Item

Ask Claude:
```
"Add a new gallery item for my [car model] render.
The image is at assets/images/mycar.jpg and it's a sports car"
```

#### Changing Colors

Ask Claude:
```
"Change the color scheme to match these colors:
Primary: #FF4500 (orange-red)
Secondary: #1E90FF (blue)"
```

#### Adding Social Links

Ask Claude:
```
"Add my ArtStation profile to the contact section: [url]"
```

### Tips for Working with Claude Code

1. **Be Specific**: The more details you provide, the better the result
2. **Ask for Explanations**: "Can you explain how this animation works?"
3. **Request Alternatives**: "Show me 3 different color schemes for this"
4. **Iterate**: Make small changes and test as you go
5. **Use Examples**: "Make the gallery look like [reference site]"

### Backup and Version Control

- **Local Backup**: Everything is already saved in your Dropbox
- **Version History**: All changes are tracked in git
- **View History**: `git log` to see all commits
- **Undo Changes**: Ask Claude "revert the last commit" if needed

### Getting Help

If something breaks:
```
"The navigation menu isn't working. Can you debug it?"
```

If you want to try something new:
```
"I want to add a 3D viewer for my Blender models. Is that possible?"
```

### Next Steps

1. **Add Your Content**: Upload your Blender renders to `assets/images/`
2. **Customize Text**: Update your bio, project descriptions
3. **Test on Mobile**: Check how it looks on your phone
4. **Share**: Send the link to potential clients/employers

### Publishing Updates

Every time you push to GitHub:
1. Changes go to: https://github.com/Pelicat013/Portfolio.V1.01
2. Website updates automatically at: https://pelicat013.github.io/Portfolio.V1.01/
3. Wait 1-2 minutes for GitHub Pages to rebuild

---

**Pro Tip**: Keep Claude Code open while working on your portfolio. Just chat naturally about what you want to change, and Claude will handle the technical details!

## Need Inspiration?

Ask Claude for ideas:
- "Suggest 5 features that would make my portfolio stand out"
- "What animations would showcase car renders well?"
- "How can I optimize my site for recruiter visits?"

Happy building! 🚀
