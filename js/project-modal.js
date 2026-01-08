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

    // Placeholder functions - you can customize these
    getProjectDescription(title) {
        return 'Detailed project description will go here. Add your project overview, goals, and outcomes.';
    }

    getProjectTechStack(category) {
        const techStacks = {
            aerospace: ['SolidWorks', 'MATLAB', '3D Printing'],
            cad: ['SolidWorks', 'CAD', 'Manufacturing'],
            renders: ['Blender', 'Cycles', 'Photoshop'],
            media: ['Premiere Pro', 'After Effects', 'Illustrator'],
            automation: ['Python', 'Bash', 'Data Analysis']
        };
        return techStacks[category] || [];
    }

    getProjectFeatures(title) {
        return [
            'Feature description one',
            'Feature description two',
            'Feature description three'
        ];
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.projectModal = new ProjectModal();
});
