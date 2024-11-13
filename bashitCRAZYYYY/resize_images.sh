#!/bin/bash

# Directory containing images
IMAGE_DIR="../public"  # Change this to your image directory

# Find and resize images
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | while read -r file; do
    # Get the width of the image
    width=$(identify -format "%w" "$file")

    # Check if the width is less than 100 or greater than 250
    if [ "$width" -lt 100 ] || [ "$width" -gt 250 ]; then
        echo "Resizing $file to width 250"
        # Resize the image while maintaining aspect ratio
        convert "$file" -resize 250x "$file"
    else
        echo "Skipping $file (width: $width)"
    fi
done