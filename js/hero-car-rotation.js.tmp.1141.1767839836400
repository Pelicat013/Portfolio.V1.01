// Interactive LMP1 Car Rotation System
// Rotates the car based on mouse X position

class CarRotation {
    constructor(options = {}) {
        // Configuration
        this.container = options.container || document.querySelector('.hero-car-container');
        this.totalFrames = options.totalFrames || 91; // Number of rendered frames (0-90 = 91 frames)
        this.defaultFrame = options.defaultFrame || Math.floor(this.totalFrames / 2); // Start at middle
        this.imagePath = options.imagePath || 'assets/images/hero/car-rotation/frame_';
        this.imageFormat = options.imageFormat || 'png'; // or 'jpg'
        this.frameDigits = options.frameDigits || 4; // e.g., frame_0001.png

        // State
        this.currentFrame = this.defaultFrame;
        this.images = [];
        this.imagesLoaded = 0;
        this.isReady = false;

        // Performance
        this.isDragging = false;
        this.useRAF = true; // Use requestAnimationFrame for smooth updates

        // Initialize
        if (this.container) {
            this.init();
        }
    }

    init() {
        // Create canvas for rendering frames
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Show loading indicator
        this.showLoading();

        // Preload all frames
        this.preloadFrames();

        // Setup mouse tracking
        this.setupMouseTracking();
    }

    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        // Redraw current frame at new size
        if (this.isReady) {
            this.drawFrame(this.currentFrame);
        }
    }

    showLoading() {
        const loader = document.createElement('div');
        loader.className = 'car-loader';
        loader.innerHTML = `
            <div class="loader-spinner"></div>
            <p>Loading 3D Model...</p>
            <div class="loader-progress">
                <div class="loader-bar" style="width: 0%"></div>
            </div>
        `;
        this.container.appendChild(loader);
        this.loader = loader;
    }

    updateLoadingProgress() {
        const progress = (this.imagesLoaded / this.totalFrames) * 100;
        const bar = this.loader?.querySelector('.loader-bar');
        if (bar) {
            bar.style.width = progress + '%';
        }
    }

    hideLoading() {
        if (this.loader) {
            this.loader.style.opacity = '0';
            setTimeout(() => {
                this.loader?.remove();
                this.loader = null;
            }, 300);
        }
    }

    preloadFrames() {
        console.log(`Preloading ${this.totalFrames} frames...`);

        for (let i = 0; i < this.totalFrames; i++) {
            const img = new Image();
            const frameNumber = this.padFrameNumber(i);
            img.src = `${this.imagePath}${frameNumber}.${this.imageFormat}`;

            img.onload = () => {
                this.imagesLoaded++;
                this.updateLoadingProgress();

                // All frames loaded
                if (this.imagesLoaded === this.totalFrames) {
                    this.isReady = true;
                    this.hideLoading();
                    this.drawFrame(this.defaultFrame); // Draw default frame (middle position)
                    console.log('All frames loaded! Car rotation ready.');
                }
            };

            img.onerror = () => {
                console.error(`Failed to load frame: ${img.src}`);
                this.imagesLoaded++;
                this.updateLoadingProgress();
            };

            this.images.push(img);
        }
    }

    padFrameNumber(num) {
        return String(num).padStart(this.frameDigits, '0');
    }

    setupMouseTracking() {
        let mouseX = 0;
        let targetFrame = 0;

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            if (!this.isReady) return;

            mouseX = e.clientX;
            const windowWidth = window.innerWidth;

            // Map mouse position (0 to windowWidth) to frame number (0 to totalFrames-1)
            targetFrame = Math.floor((mouseX / windowWidth) * this.totalFrames);
            targetFrame = Math.max(0, Math.min(this.totalFrames - 1, targetFrame));

            // Update frame
            if (this.useRAF) {
                this.requestFrameUpdate(targetFrame);
            } else {
                this.updateFrame(targetFrame);
            }
        });

        // Touch support for mobile
        document.addEventListener('touchmove', (e) => {
            if (!this.isReady) return;

            const touch = e.touches[0];
            mouseX = touch.clientX;
            const windowWidth = window.innerWidth;

            targetFrame = Math.floor((mouseX / windowWidth) * this.totalFrames);
            targetFrame = Math.max(0, Math.min(this.totalFrames - 1, targetFrame));

            this.requestFrameUpdate(targetFrame);
        });
    }

    requestFrameUpdate(targetFrame) {
        if (this.currentFrame !== targetFrame) {
            if (!this.pendingUpdate) {
                this.pendingUpdate = requestAnimationFrame(() => {
                    this.updateFrame(targetFrame);
                    this.pendingUpdate = null;
                });
            }
        }
    }

    updateFrame(frameIndex) {
        this.currentFrame = frameIndex;
        this.drawFrame(frameIndex);
    }

    drawFrame(frameIndex) {
        if (!this.images[frameIndex] || !this.images[frameIndex].complete) return;

        const img = this.images[frameIndex];

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Calculate scaling to fit canvas while maintaining aspect ratio
        const imgAspect = img.width / img.height;
        const canvasAspect = this.canvas.width / this.canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgAspect > canvasAspect) {
            // Image is wider - fit to width
            drawWidth = this.canvas.width;
            drawHeight = drawWidth / imgAspect;
            offsetX = 0;
            offsetY = (this.canvas.height - drawHeight) / 2;
        } else {
            // Image is taller - fit to height
            drawHeight = this.canvas.height;
            drawWidth = drawHeight * imgAspect;
            offsetX = (this.canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        // Draw image
        this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if hero car container exists
    const carContainer = document.querySelector('.hero-car-container');

    if (carContainer) {
        // Initialize car rotation
        window.carRotation = new CarRotation({
            totalFrames: 91,           // 0-90 frames = 91 total
            defaultFrame: 45,          // Start at middle (frame 45)
            imagePath: 'assets/images/hero/car-rotation/frame_',
            imageFormat: 'png',        // or 'jpg'
            frameDigits: 4            // frame_0000.png, frame_0001.png, etc.
        });

        console.log('Interactive car rotation initialized! (91 frames, starting at frame 45)');
    }
});
