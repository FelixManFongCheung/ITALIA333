async function loadImages() {
    const imageContainer = document.getElementById('gallery');
    const images = await fetch('./public/images.json')
        .then((response) => response.json())
        .then((json) => json.images);    

    let index = 0; // Initialize index to track the current image

    images.forEach((url) => renderRecusion(imageContainer, url));
}

async function renderRecusion(imageContainer, url) {
    const randomNumber = Math.random() * (10 - 1 + 1) + 1;
    
    await new Promise(resolve => setTimeout(resolve, randomNumber*1000));

    const img = document.createElement('img');
    img.src = url; // Cycle through images
    img.classList.add('image'); // Add only the image class initially
    imageContainer.appendChild(img);
    setDynamicTransitionDuration(img, 4);


    // Wait for the image to load before adding the fade-in class
    img.onload = () => {
        setRandomPosition(img);
        img.classList.add('fade-in'); 
    };

    // Wait for the fade-in duration
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Remove the fade-in class and add fade-out class
    img.classList.remove('fade-in');
    img.classList.add('fade-out');

    // Wait for the fade-out duration
    await new Promise(resolve => setTimeout(resolve, 2000)); // Duration of fade-out

    // Remove the image from the DOM
    imageContainer.removeChild(img);

    renderRecusion(imageContainer, url);
}

function setDynamicTransitionDuration(element, duration) {
    element.style.transition = `opacity ${duration}s ease`; // Set the transition duration dynamically
}

function setRandomPosition(img) {
    // Get the dimensions of the viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate maximum x and y positions
    const maxX = viewportWidth - img.width; // Use img.width after it loads
    const maxY = viewportHeight - img.height; // Use img.height after it loads

    // Generate random positions within the bounds
    const min = -20
    const posX = Math.floor(Math.random() * (maxX-(min)+1)) + (min);
    const posY = Math.floor(Math.random() * (maxY-(min)+1)) + (min);

    // Set the position of the image
    img.style.position = 'absolute'; // Ensure the image is positioned absolutely
    img.style.left = `${posX}px`;
    img.style.top = `${posY}px`;
}

loadImages();