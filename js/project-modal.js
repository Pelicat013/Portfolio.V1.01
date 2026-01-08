// Project Modal System - Expandable Fullscreen Cards

class ProjectModal {
    constructor() {
        this.modal = null;
        this.currentProject = null;
        this.currentImageIndex = 0;
        this.init();
    }

    init() {
        // Create modal HTML structure
        this.createModal();

        // Attach event listeners
        this.attachEvents();

        console.log('Project modal system initialized!');
    }

    createModal() {
        const modalHTML = `
            <div class="project-modal" id="projectModal">
                <div class="modal-content">
                    <div class="modal-close" id="modalClose"></div>

                    <div class="modal-header">
                        <h2 class="modal-title" id="modalTitle"></h2>
                        <div class="modal-meta" id="modalMeta"></div>
                    </div>

                    <div class="modal-body">
                        <div class="modal-gallery">
                            <div class="gallery-main" id="galleryMain">
                                <div class="gallery-nav prev" id="galleryPrev">
                                    <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                                </div>
                                <div class="gallery-nav next" id="galleryNext">
                                    <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                                </div>
                            </div>
                            <div class="gallery-thumbnails" id="galleryThumbs"></div>
                        </div>

                        <div class="modal-details" id="modalDetails"></div>
                    </div>
                </div>
            </div>
        `;

        // Add to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('projectModal');
    }

    attachEvents() {
        // Close button
        document.getElementById('modalClose').addEventListener('click', () => this.close());

        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });

        // Gallery navigation
        document.getElementById('galleryPrev').addEventListener('click', () => this.prevImage());
        document.getElementById('galleryNext').addEventListener('click', () => this.nextImage());

        // Arrow keys for gallery
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;

            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
        });

        // Attach to all gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(item);
            });
        });
    }

    open(projectElement) {
        // Extract project data from element
        const project = this.extractProjectData(projectElement);
        this.currentProject = project;
        this.currentImageIndex = 0;

        // Populate modal
        this.populateModal(project);

        // Show modal
        document.body.style.overflow = 'hidden';
        this.modal.classList.add('active');
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentProject = null;
    }

    extractProjectData(element) {
        // Get data from element or data attributes
        const title = element.querySelector('.gallery-info h3')?.textContent || 'Project';
        const description = element.querySelector('.gallery-info p')?.textContent || '';
        const category = element.getAttribute('data-category') || 'general';

        // Get images from element
        const mainImage = element.querySelector('img')?.src || element.querySelector('.gallery-image-placeholder')?.style.backgroundImage;

        // You can extend this to pull from data attributes or a separate data source
        return {
            title,
            description,
            category,
            images: [mainImage], // Will be extended
            fullDescription: this.getProjectDescription(title),
            techStack: this.getProjectTechStack(category),
            features: this.getProjectFeatures(title),
            links: []
        };
    }

    populateModal(project) {
        // Title
        document.getElementById('modalTitle').textContent = project.title;

        // Meta tags
        const metaHTML = `
            <span class="meta-tag">${this.formatCategory(project.category)}</span>
            ${project.techStack ? project.techStack.map(tech => `<span class="meta-tag">${tech}</span>`).join('') : ''}
        `;
        document.getElementById('modalMeta').innerHTML = metaHTML;

        // Gallery
        this.populateGallery(project.images);

        // Details
        const detailsHTML = `
            <div class="details-section">
                <h3>Overview</h3>
                <p>${project.fullDescription || project.description}</p>
            </div>

            ${project.features && project.features.length > 0 ? `
            <div class="details-section">
                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            ${project.techStack && project.techStack.length > 0 ? `
            <div class="details-section">
                <h3>Technologies Used</h3>
                <p>${project.techStack.join(' • ')}</p>
            </div>
            ` : ''}

            ${project.links && project.links.length > 0 ? `
            <div class="details-section">
                <h3>Links</h3>
                <div class="project-links">
                    ${project.links.map(link => `
                        <a href="${link.url}" class="project-link ${link.secondary ? 'secondary' : ''}" target="_blank" rel="noopener">
                            ${link.text}
                        </a>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        `;
        document.getElementById('modalDetails').innerHTML = detailsHTML;
    }

    populateGallery(images) {
        const mainGallery = document.getElementById('galleryMain');
        const thumbsContainer = document.getElementById('galleryThumbs');

        // Clear existing
        const existingImages = mainGallery.querySelectorAll('img');
        existingImages.forEach(img => img.remove());

        // Add images
        images.forEach((imgSrc, index) => {
            // Main image
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Gallery image ${index + 1}`;
            if (index === 0) img.classList.add('active');
            mainGallery.appendChild(img);

            // Thumbnail
            const thumb = document.createElement('div');
            thumb.className = 'gallery-thumb' + (index === 0 ? ' active' : '');
            thumb.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${index + 1}">`;
            thumb.addEventListener('click', () => this.showImage(index));
            thumbsContainer.appendChild(thumb);
        });

        // Hide nav if only one image
        document.getElementById('galleryPrev').style.display = images.length > 1 ? 'flex' : 'none';
        document.getElementById('galleryNext').style.display = images.length > 1 ? 'flex' : 'none';
    }

    showImage(index) {
        const images = document.querySelectorAll('#galleryMain img');
        const thumbs = document.querySelectorAll('.gallery-thumb');

        images.forEach(img => img.classList.remove('active'));
        thumbs.forEach(thumb => thumb.classList.remove('active'));

        images[index].classList.add('active');
        thumbs[index].classList.add('active');

        this.currentImageIndex = index;
    }

    nextImage() {
        const images = document.querySelectorAll('#galleryMain img');
        const nextIndex = (this.currentImageIndex + 1) % images.length;
        this.showImage(nextIndex);
    }

    prevImage() {
        const images = document.querySelectorAll('#galleryMain img');
        const prevIndex = (this.currentImageIndex - 1 + images.length) % images.length;
        this.showImage(prevIndex);
    }

    formatCategory(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    // Project descriptions - Edit these to customize your project details
    // Search for project ID (FP1, FP2, etc.) to quickly find the right project
    getProjectDescription(title) {
        const descriptions = {
            // FP1: ProjScarecrow VTOL Drone
            'ProjScarecrow VTOL Drone': 'A fully custom fixed-wing VTOL (Vertical Take-Off and Landing) FPV drone designed for long-range autonomous flight. This project combines traditional aerodynamic design with modern drone technology, featuring a 3D-printed modular airframe that allows for easy repairs and modifications. The VTOL capability enables vertical takeoff and landing while maintaining efficient fixed-wing cruise flight for extended range.',

            // FP2: FPV Racing Drone
            'FPV Racing Drone Build': 'High-performance FPV racing drone built for competitive racing and freestyle flying. Features a lightweight carbon fiber frame, powerful motors for aggressive maneuvers, and a DJI digital FPV system for crystal-clear video transmission. Custom-tuned flight controller settings provide precise control and rapid response times essential for racing.',

            // FP3: Aerodynamic Flow Analysis
            'Aerodynamic Flow Analysis': 'Computational Fluid Dynamics (CFD) analysis of airflow patterns around aerodynamic surfaces. This study examines pressure distribution, boundary layer separation, and wake characteristics to optimize lift-to-drag ratios. Results inform design decisions for improved aerodynamic efficiency in aerospace applications.',

            // FP4: Audi Quattro Forest Scene
            'Audi Quattro Forest Scene': 'Photorealistic 3D rendering of an Audi Quattro in a forest environment, created entirely in Blender using the Cycles render engine. Features volumetric fog effects, physically-based materials, and HDR environment lighting to achieve a cinematic quality. Rendered at 8K resolution for maximum detail and post-processed for color grading and atmospheric effects.',

            // FP5: Commercial Product Photography
            'Commercial Product Photography': 'Professional product photography for commercial use, shot with Sony ZV-E10 and studio lighting setup. Focus on clean composition, precise lighting control, and accurate color reproduction. Post-processing in Lightroom ensures consistent brand presentation across product lines.',

            // FP6: Professional Portrait Series
            'Professional Portrait Series': 'Environmental portrait series capturing subjects in their natural settings using available light techniques. Emphasizes storytelling through composition, natural expressions, and thoughtful use of depth of field. Post-processing maintains authentic skin tones while enhancing overall mood and atmosphere.',

            // FP7: Golf Analytics Dashboard
            'Golf Analytics Dashboard': 'Automated data analysis application for golf launch monitor data (Garmin R10). Python-based tool processes raw shot data, generates statistical insights, and creates interactive visualizations for performance tracking. Features include distance analysis, dispersion patterns, club comparisons, and progress tracking over time.',

            // FP8: Automotive Photography
            'Automotive Photography': 'Dynamic automotive photography showcasing motion and speed through panning techniques. Captures the essence of movement while maintaining sharpness on the subject vehicle. Careful selection of shutter speed, panning motion, and composition create dramatic motion blur effects in the background.',

            // FP9: Landscape Photography Series
            'Landscape Photography Series': 'Landscape photography utilizing long exposure techniques to capture dramatic skies and smooth water surfaces. Shot during golden hour and blue hour for optimal lighting conditions. Post-processing emphasizes natural colors while enhancing dynamic range through careful exposure blending.',

            // FP10: VTOL Flight Control System
            'VTOL Flight Control System': 'Advanced flight control system implementation for VTOL aircraft using INAV flight controller firmware. Features GPS waypoint navigation, automatic transition between hover and forward flight modes, and failsafe return-to-home functionality. Includes custom mixing configuration for quad motors and fixed-wing control surfaces.',

            // FP11: Structural Wing Assembly
            'Structural Wing Assembly': 'Detailed SolidWorks CAD model of aircraft wing structural assembly including spars, ribs, and skin. Includes Finite Element Analysis (FEA) to verify structural integrity under aerodynamic loads. Design optimized for weight reduction while maintaining required safety factors and considering manufacturability.',

            // FP12: LMP1 Race Car Render
            'LMP1 Race Car Render': 'Studio-quality render of LMP1 prototype race car created in Blender with professional lighting and materials. Features accurate physical properties including metallic paint, carbon fiber weave, and glass reflections. Post-processing in Photoshop adds final color grading and subtle imperfections for photorealism.'
        };

        return descriptions[title] || 'Detailed project description will go here. Edit js/project-modal.js to customize this text.';
    }

    getProjectTechStack(category) {
        const techStacks = {
            aerospace: ['SolidWorks', 'INAV', '3D Printing', 'Flight Testing', 'BambuLab P1s'],
            cad: ['SolidWorks', 'FEA Analysis', 'CFD Simulation', 'Technical Drawing', 'GD&T'],
            renders: ['Blender', 'Cycles Renderer', 'Photoshop', 'HDR Lighting', 'Composition'],
            media: ['Sony ZV-E10', 'Lightroom', 'Premiere Pro', 'Color Grading', 'Studio Lighting'],
            automation: ['Python', 'Pandas', 'Matplotlib', 'Data Analysis', 'Jupyter']
        };
        return techStacks[category] || [];
    }

    getProjectFeatures(title) {
        const features = {
            // FP1: ProjScarecrow VTOL Drone
            'ProjScarecrow VTOL Drone': [
                'Fully 3D-printed modular airframe using BambuLab P1s printer',
                'VTOL quad motor configuration for vertical takeoff and landing',
                'Fixed-wing design optimized for efficient cruise flight',
                'INAV flight controller with GPS waypoint navigation',
                'Long-range FPV system for pilot control and video recording',
                'Modular design allows easy repairs and component upgrades'
            ],

            // FP2: FPV Racing Drone
            'FPV Racing Drone Build': [
                'Lightweight carbon fiber frame for maximum durability',
                'High-KV motors providing exceptional thrust-to-weight ratio',
                'DJI digital FPV system for low-latency HD video transmission',
                'Custom-tuned PID settings for precise control response',
                '4S/6S battery compatibility for flexible performance options',
                'Optimized for both racing gates and freestyle maneuvers'
            ],

            // FP3: Aerodynamic Flow Analysis
            'Aerodynamic Flow Analysis': [
                'CFD simulation using SolidWorks Flow Simulation module',
                'Pressure distribution mapping across aerodynamic surfaces',
                'Boundary layer visualization and separation point identification',
                'Wake analysis for drag reduction optimization',
                'Multiple angle of attack scenarios tested',
                'Results validated against theoretical aerodynamic principles'
            ],

            // FP4: Audi Quattro Forest Scene
            'Audi Quattro Forest Scene': [
                '8K resolution rendering for maximum detail clarity',
                'Physically-based materials with accurate reflections',
                'Volumetric fog and atmospheric effects for depth',
                'HDRI environment lighting for realistic illumination',
                'Detailed forest environment with photoscanned assets',
                'Color grading and post-processing in Photoshop'
            ],

            // FP5: Commercial Product Photography
            'Commercial Product Photography': [
                'Sony ZV-E10 camera with professional lens selection',
                'Multi-light studio setup with softboxes and reflectors',
                'Clean white background for versatile product presentation',
                'Focus stacking for maximum depth of field',
                'RAW processing in Lightroom for precise color control',
                'Consistent lighting and composition across product line'
            ],

            // FP6: Professional Portrait Series
            'Professional Portrait Series': [
                'Environmental portraits in natural settings',
                'Available light techniques with minimal equipment',
                'Thoughtful composition emphasizing subject and context',
                'Shallow depth of field for subject isolation',
                'Natural expressions captured through rapport building',
                'Post-processing maintains authentic skin tones'
            ],

            // FP7: Golf Analytics Dashboard
            'Golf Analytics Dashboard': [
                'Automated data import from Garmin R10 launch monitor',
                'Statistical analysis of shot dispersion patterns',
                'Club-by-club performance comparisons and trends',
                'Interactive visualizations using Matplotlib and Seaborn',
                'Distance gapping analysis for optimal club selection',
                'Progress tracking and historical performance data'
            ],

            // FP8: Automotive Photography
            'Automotive Photography': [
                'Panning technique for motion blur background effect',
                'Careful shutter speed selection for desired blur amount',
                'Subject tracking for consistent sharpness on vehicle',
                'Shot during optimal lighting conditions',
                'Composition emphasizes speed and dynamic motion',
                'Minimal post-processing to maintain authentic feel'
            ],

            // FP9: Landscape Photography Series
            'Landscape Photography Series': [
                'Long exposure techniques for smooth water and clouds',
                'Shot during golden hour and blue hour for dramatic light',
                'Neutral density filters for extended exposure times',
                'Focus stacking for front-to-back sharpness',
                'Exposure blending for balanced dynamic range',
                'Natural color enhancement in post-processing'
            ],

            // FP10: VTOL Flight Control System
            'VTOL Flight Control System': [
                'INAV flight controller firmware with custom configuration',
                'GPS waypoint navigation with automatic mission execution',
                'Smooth transition logic between hover and forward flight',
                'Failsafe return-to-home functionality',
                'Custom servo mixing for quad motors and control surfaces',
                'Real-time telemetry monitoring during flight'
            ],

            // FP11: Structural Wing Assembly
            'Structural Wing Assembly': [
                'Complete CAD model with all structural components',
                'FEA stress analysis under aerodynamic load conditions',
                'Weight optimization while maintaining safety factors',
                'Detailed manufacturing drawings with GD&T specifications',
                'Material selection based on strength-to-weight ratios',
                'Assembly instructions and bill of materials included'
            ],

            // FP12: LMP1 Race Car Render
            'LMP1 Race Car Render': [
                'Photorealistic materials including metallic paint and carbon fiber',
                'Studio lighting setup with three-point lighting technique',
                'Accurate physical properties for glass and metal reflections',
                'HDRI environment reflections for realistic surroundings',
                'Post-processing adds subtle wear and camera lens effects',
                'Composition follows professional automotive photography principles'
            ]
        };

        return features[title] || [
            'Feature description one - edit in js/project-modal.js',
            'Feature description two - edit in js/project-modal.js',
            'Feature description three - edit in js/project-modal.js'
        ];
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.projectModal = new ProjectModal();
});
