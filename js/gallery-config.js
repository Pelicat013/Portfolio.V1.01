// Gallery Configuration
// This file controls which images appear in each gallery section
// Simply add images to the folders and they will automatically appear!

const galleryConfig = {
    // Map folder names to gallery categories
    categories: {
        'aerospace': {
            title: 'Aerospace Projects',
            description: 'VTOL drones, FPV systems, and flight engineering',
            folder: 'assets/images/aerospace'
        },
        'cad': {
            title: 'CAD & Design',
            description: 'SolidWorks models, 3D printing, and prototypes',
            folder: 'assets/images/cad'
        },
        'renders': {
            title: '3D Renders',
            description: 'Blender visualizations and animations',
            folder: 'assets/images/renders'
        },
        'media': {
            title: 'Media Production',
            description: 'Video editing, graphics, and content creation',
            folder: 'assets/images/media'
        },
        'automation': {
            title: 'Automation & Data',
            description: 'Scripts, data analysis, and process optimization',
            folder: 'assets/images/automation'
        }
    },

    // Supported image formats
    supportedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],

    // Default project metadata
    defaultMetadata: {
        aerospace: 'Aerospace Engineering',
        cad: 'CAD • SolidWorks',
        renders: 'Blender • 3D',
        media: 'Media Production',
        automation: 'Python • Automation'
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = galleryConfig;
}
