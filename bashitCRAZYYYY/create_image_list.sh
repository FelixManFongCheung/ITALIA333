#!/bin/bash

# Directory containing images
IMAGE_DIR="./public"  # Change this to your image directory
# Output JSON file
OUTPUT_FILE="images.json"

# Start JSON structure
echo "{" > "$OUTPUT_FILE"
echo "  \"images\": [" >> "$OUTPUT_FILE"

# Find all image files and create JSON array
first=true
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | while read -r file; do
    # Get just the filename
    filename=$(basename "$file")
    
    # Add comma if not the first item
    if [ "$first" = true ]; then
        first=false
    else
        echo "," >> "$OUTPUT_FILE"
    fi
    
    # Add the image path to JSON
    echo "    \"./public/$filename\"" >> "$OUTPUT_FILE"
done

# Close JSON structure
echo "  ]" >> "$OUTPUT_FILE"
echo "}" >> "$OUTPUT_FILE"

echo "Image list has been written to $OUTPUT_FILE"