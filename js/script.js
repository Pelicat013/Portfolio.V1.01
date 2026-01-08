// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Smooth Scroll with Offset for Fixed Navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Scroll Reveal Animation for Gallery Items
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply reveal animation to gallery items
galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    revealObserver.observe(item);
});

// Parallax Effect on Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic Year in Footer
const footer = document.querySelector('.footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} Portfolio. All rights reserved.`;
}

// Gallery Item Click Event (for future modal implementation)
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log('Gallery item clicked:', item);
        // You can add modal functionality here later
    });
});

// Add custom cursor effect on hero section
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = hero;

        const xPos = (clientX / offsetWidth - 0.5) * 20;
        const yPos = (clientY / offsetHeight - 0.5) * 20;

        const gradientOverlay = hero.querySelector('.gradient-overlay');
        if (gradientOverlay) {
            gradientOverlay.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
    });
}

// Dynamic Gallery Loading
// Load gallery items from gallery-data.js if available
if (typeof galleryData !== 'undefined') {
    loadDynamicGallery();
}

function loadDynamicGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    // Check if there's any data to load
    let hasData = false;
    for (let category in galleryData) {
        if (galleryData[category] && galleryData[category].length > 0) {
            hasData = true;
            break;
        }
    }

    // If no data, keep the placeholder items
    if (!hasData) {
        console.log('No gallery data found - using placeholders');
        return;
    }

    // Clear placeholder items
    container.innerHTML = '';

    // Load items from each category
    for (let category in galleryData) {
        const items = galleryData[category];
        if (!items || items.length === 0) continue;

        items.forEach(item => {
            const galleryItem = createGalleryItem(category, item);
            container.appendChild(galleryItem);
        });
    }

    // Re-apply reveal observer to new items
    const newItems = container.querySelectorAll('.gallery-item');
    newItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        revealObserver.observe(item);
    });

    console.log('Dynamic gallery loaded successfully!');
}

function createGalleryItem(category, data) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-category', category);

    // Check if we have just a filename or full data
    const filename = typeof data === 'string' ? data : data.file;
    const title = data.title || filename.replace(/\.[^.]*$/, '').replace(/[-_]/g, ' ');
    const description = data.description || (galleryConfig?.defaultMetadata?.[category] || category);

    // Determine if we should show an image or placeholder
    const folderPath = galleryConfig?.categories?.[category]?.folder || `assets/images/${category}`;
    const imagePath = `${folderPath}/${filename}`;

    item.innerHTML = `
        <img src="${imagePath}" alt="${title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="gallery-image-placeholder" style="display: none;">
            <p>Image: ${filename}</p>
            <span>${category}</span>
        </div>
        <div class="gallery-info">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;

    return item;
}

// Skill Bar Animations on Scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.width = bar.parentElement.parentElement.querySelector('.skill-progress').style.width;
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    // Initially set all skill bars to 0 width for animation
    const allSkillBars = skillsSection.querySelectorAll('.skill-progress');
    allSkillBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.setAttribute('data-width', targetWidth);
        bar.style.width = '0%';
    });

    // Observe the skills section
    skillObserver.observe(skillsSection);

    // When visible, animate to target width
    const skillAnimObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 100);
                });
                skillAnimObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillAnimObserver.observe(skillsSection);
}

console.log('Portfolio loaded successfully! 🚀');
