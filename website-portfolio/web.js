const images = ["assets/attacksharkX3-side.png", 
    "assets/asusrogharp2-side.png", 
    "assets/vxer1se+-side.png"];

let currentIndex = 0;
const slideContainer = document.getElementById('carouselSlide');
const indicatorsContainer = document.getElementById('indicator');
let autoSlideInterval;

// Create slides and indicators
function createCarousel() {
    slideContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    images.forEach((imgSrc, index) => {
    // Create image element
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `Slide ${index + 1}`;
    slideContainer.appendChild(img);

    // Create indicator
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    
    indicator.addEventListener('click', () => {
        goToSlide(index);
    });
    
    indicatorsContainer.appendChild(indicator);
    });
}

// Update active indicator
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
    });
}

// Go to specific slide
function goToSlide(index) {
    currentIndex = index;
    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
}

// Next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
}

// Previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
}

// Auto slide function
function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 4000); // Change every 4 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('btn-next').addEventListener('click', () => {
    nextSlide();
    startAutoSlide(); // Reset timer on manual click
    });

    document.getElementById('btn-prev').addEventListener('click', () => {
    prevSlide();
    startAutoSlide();
    });

    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
}

// Initialize Carousel
function initCarousel() {
    createCarousel();
    setupEventListeners();
    startAutoSlide();
}

// Start the carousel
window.onload = initCarousel;