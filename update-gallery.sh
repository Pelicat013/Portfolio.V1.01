#!/bin/bash

# Auto-generate gallery data from image folders
# Usage: bash update-gallery.sh

echo "Scanning image folders..."

# Output file
OUTPUT="js/gallery-data.js"

# Start building the JavaScript file
cat > "$OUTPUT" << 'EOF'
// Gallery Images Data
// AUTO-GENERATED - Do not edit manually
// Run 'bash update-gallery.sh' to update this file
// Last updated:
EOF

echo "// $(date)" >> "$OUTPUT"

cat >> "$OUTPUT" << 'EOF'

const galleryData = {
EOF

# Function to scan a folder and add to gallery data
scan_folder() {
    local category=$1
    local folder=$2

    echo "    ${category}: [" >> "$OUTPUT"

    # Find all image files in the folder
    find "$folder" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) | sort | while read -r img; do
        filename=$(basename "$img")
        # Generate title from filename (remove extension, replace - and _ with spaces, capitalize)
        title=$(basename "$img" | sed 's/\.[^.]*$//' | sed 's/[-_]/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')

        echo "        { file: '${filename}', title: '${title}', description: '' }," >> "$OUTPUT"
    done

    echo "    ]," >> "$OUTPUT"
}

# Scan each category folder
scan_folder "aerospace" "assets/images/aerospace"
scan_folder "cad" "assets/images/cad"
scan_folder "renders" "assets/images/renders"
scan_folder "media" "assets/images/media"
scan_folder "automation" "assets/images/automation"

# Close the JavaScript object
cat >> "$OUTPUT" << 'EOF'
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = galleryData;
}
EOF

echo ""
echo "✓ Gallery data updated successfully!"
echo "✓ Found images in:"
echo "  - Aerospace: $(find assets/images/aerospace -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) 2>/dev/null | wc -l) images"
echo "  - CAD: $(find assets/images/cad -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) 2>/dev/null | wc -l) images"
echo "  - Renders: $(find assets/images/renders -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) 2>/dev/null | wc -l) images"
echo "  - Media: $(find assets/images/media -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) 2>/dev/null | wc -l) images"
echo "  - Automation: $(find assets/images/automation -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) 2>/dev/null | wc -l) images"
echo ""
echo "Your gallery has been updated! Commit and push to see changes live."
