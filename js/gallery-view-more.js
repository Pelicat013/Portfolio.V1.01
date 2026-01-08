// Gallery View More Functionality
// Shows 6 projects initially, 3 when filter is applied

class GalleryViewMore {
    constructor() {
        this.allProjects = [];
        this.currentFilter = 'all';
        this.isExpanded = false;
        this.viewMoreBtn = null;

        // Configuration
        this.initialShowAll = 6;        // Show 6 projects when "All" filter
        this.initialShowFiltered = 3;   // Show 3 projects when specific filter applied

        this.init();
    }

    init() {
        // Get all gallery items
        this.allProjects = Array.from(document.querySelectorAll('.gallery-item'));
        this.viewMoreBtn = document.getElementById('viewMoreBtn');

        if (!this.viewMoreBtn) {
            console.error('View More button not found');
            return;
        }

        // Initial display
        this.updateDisplay();

        // Listen for filter changes
        this.setupFilterListeners();

        // View More button click
        this.viewMoreBtn.addEventListener('click', () => this.showAll());

        console.log('Gallery View More initialized');
    }

    setupFilterListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentFilter = btn.getAttribute('data-filter');
                this.isExpanded = false;
                this.updateDisplay();
            });
        });
    }

    updateDisplay() {
        // Get projects matching current filter
        const matchingProjects = this.getMatchingProjects();
        const limit = this.isExpanded ? matchingProjects.length : this.getInitialLimit();

        // Hide all projects first
        this.allProjects.forEach(project => {
            project.style.display = 'none';
            project.classList.remove('gallery-item-visible');
        });

        // Show only the ones that should be visible
        matchingProjects.forEach((project, index) => {
            if (index < limit) {
                project.style.display = 'block';
                // Trigger animation after small delay
                setTimeout(() => {
                    project.classList.add('gallery-item-visible');
                }, index * 50);
            }
        });

        // Update View More button
        this.updateButton(matchingProjects.length, limit);
    }

    getMatchingProjects() {
        if (this.currentFilter === 'all') {
            return this.allProjects;
        }

        return this.allProjects.filter(project => {
            return project.getAttribute('data-category') === this.currentFilter;
        });
    }

    getInitialLimit() {
        return this.currentFilter === 'all' ? this.initialShowAll : this.initialShowFiltered;
    }

    updateButton(totalCount, visibleCount) {
        const remainingCount = totalCount - visibleCount;
        const viewMoreSection = document.querySelector('.gallery-view-more');

        if (remainingCount > 0 && !this.isExpanded) {
            // Show button with count
            viewMoreSection.style.display = 'flex';
            const countSpan = this.viewMoreBtn.querySelector('.view-more-count');
            countSpan.textContent = `(+${remainingCount})`;
        } else {
            // Hide button when all shown or expanded
            viewMoreSection.style.display = 'none';
        }
    }

    showAll() {
        this.isExpanded = true;
        this.updateDisplay();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.galleryViewMore = new GalleryViewMore();
});
