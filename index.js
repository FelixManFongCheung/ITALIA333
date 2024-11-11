async function loadImages() {
    const imageContainer = document.getElementById('gallery');
    const images = await fetch('./images.json')
        .then((response) => response.json())
        .then((json) => json.images);

    let index = 0; // Initialize index to track the current image

    while (true) { // Infinite loop
        const img = document.createElement('img');
        img.src = images[index % images.length]; // Cycle through images
        img.classList.add('image'); // Add only the image class initially
        imageContainer.appendChild(img);

        // Wait for the image to load before adding the fade-in class
        img.onload = () => {
            setRandomPosition(img);
            img.classList.add('fade-in'); // Add fade-in class after image is loaded
        };

        // Wait for the fade-in duration
        await new Promise(resolve => setTimeout(resolve, 4000));

        // Remove the fade-in class and add fade-out class
        img.classList.remove('fade-in');
        img.classList.add('fade-out');

        // Wait for the fade-out duration
        await new Promise(resolve => setTimeout(resolve, 4000)); // Duration of fade-out

        // Remove the image from the DOM
        imageContainer.removeChild(img);

        index++; // Increment index to move to the next image
    }
}

function setRandomPosition(img) {
    // Get the dimensions of the viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate maximum x and y positions
    const maxX = viewportWidth - img.width; // Use img.width after it loads
    const maxY = viewportHeight - img.height; // Use img.height after it loads

    // Generate random positions within the bounds
    const posX = Math.random() * maxX;
    const posY = Math.random() * maxY;

    // Set the position of the image
    img.style.position = 'absolute'; // Ensure the image is positioned absolutely
    img.style.left = `${posX}px`;
    img.style.top = `${posY}px`;
}

loadImages();