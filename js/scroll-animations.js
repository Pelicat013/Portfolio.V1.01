// Scroll-Triggered Animations & Parallax Effects

class ScrollAnimations {
    constructor() {
        this.sections = [];
        this.galleryItems = [];
        this.skillBars = [];
        this.parallaxElements = [];
        this.scrollProgress = 0;

        this.init();
    }

    init() {
        // Initialize all animation observers
        this.setupSectionObserver();
        this.setupGalleryObserver();
        this.setupSkillBarObserver();
        this.setupParallax();
        this.setupScrollProgress();
        this.setupSmoothScroll();

        console.log('Scroll animations initialized!');
    }

    // Section fade-in animations
    setupSectionObserver() {
        const sections = document.querySelectorAll('section');

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        });

        sections.forEach(section => {
            section.classList.add('section-animated');
            sectionObserver.observe(section);
        });
    }

    // Gallery card stagger animations
    setupGalleryObserver() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add stagger delay based on index
                    const delay = Array.from(galleryItems).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.classList.add('gallery-item-visible');
                    }, delay);
                    galleryObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -5% 0px'
        });

        galleryItems.forEach(item => {
            item.classList.add('gallery-item-animated');
            galleryObserver.observe(item);
        });
    }

    // Skill bar fill animations
    setupSkillBarObserver() {
        const skillItems = document.querySelectorAll('.skill-item');

        // Store original widths and set to 0
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.skill-progress');
            if (progressBar) {
                const targetWidth = progressBar.style.width;
                progressBar.dataset.targetWidth = targetWidth;
                progressBar.style.width = '0';
            }
        });

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar && !progressBar.classList.contains('animated')) {
                        // Animate to target width
                        setTimeout(() => {
                            progressBar.style.width = progressBar.dataset.targetWidth;
                            progressBar.classList.add('animated');
                        }, 100);
                        skillObserver.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.5
        });

        skillItems.forEach(item => {
            skillObserver.observe(item);
        });
    }

    // Parallax scroll effects
    setupParallax() {
        // Hero background parallax
        const heroBackground = document.querySelector('.hero-background');
        const heroCarContainer = document.querySelector('.hero-car-container');

        // Gallery grid parallax
        const galleryItems = document.querySelectorAll('.gallery-item');

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            // Hero parallax - background moves slower
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
            }

            // Car container slight parallax
            if (heroCarContainer) {
                heroCarContainer.style.transform = `translateY(${scrollY * 0.3}px)`;
            }

            // Gallery items parallax on hover
            galleryItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.top + rect.height / 2;
                const windowCenter = window.innerHeight / 2;
                const distance = (itemCenter - windowCenter) / windowCenter;

                // Subtle parallax movement
                const parallaxAmount = distance * 20;
                const image = item.querySelector('.gallery-image-placeholder, img');
                if (image && rect.top < window.innerHeight && rect.bottom > 0) {
                    image.style.transform = `translateY(${parallaxAmount}px)`;
                }
            });
        });
    }

    // Scroll progress indicator
    setupScrollProgress() {
        // Create progress bar element
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = (window.pageYOffset / documentHeight) * 100;

            progressBar.style.width = `${scrolled}%`;
            this.scrollProgress = scrolled;
        });
    }

    // Smooth scroll behavior for navigation links
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#" or modal close
                if (href === '#' || href.length <= 1) return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for navbar

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Hover effects with mouse parallax
    addHoverParallax(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            const rotateY = deltaX * 10;
            const rotateX = -deltaY * 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    }
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.scrollAnimations = new ScrollAnimations();

    // Optional: Add 3D tilt to gallery cards
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        if (window.innerWidth > 768) { // Only on desktop
            window.scrollAnimations.addHoverParallax(item);
        }
    });
});
