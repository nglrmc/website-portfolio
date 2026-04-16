let currentIndex = 0;
const slideContainer = document.getElementById('slide');
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

let autoSlideInterval;

const modal = document.getElementById('myModal');
const modalIds = ['vxe-modal', 'asus-modal', 'as-modal'];
const btnIds = ['vxe-btn', 'asus-btn', 'as-btn' ];

function openModal(modalId) {
    // Hide all modal content panels first
    modalIds.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    // Show the one that was clicked
    document.getElementById(modalId).style.display = 'block';

    // Show the modal overlay
    modal.style.display = 'block';

    // Pause the carousel while modal is open
    stopAutoSlide();
}

function closeModal() {
    modal.style.display = 'none';
    startAutoSlide();
}

function setupModalListeners() {
    // Wire each mouse button to its matching modal panel
    btnIds.forEach((btnId, i) => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => openModal(modalIds[i]));
        }
    });

    // Close buttons inside each modal panel
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    // Click outside the modal content to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
    });
}

function updateSlide() {
    if (!slideContainer) return;
    slideContainer.style.transform = `translateX(-${currentIndex * 33.333}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % 3;
    updateSlide();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + 3) % 3;
    updateSlide();
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 5500);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function closeMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
}

function toggleMobileNav() {
    if (!mobileNav || !navToggle) return;
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
}

function setupEventListeners() {
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const carousel   = document.querySelector('.mouse');

    if (nextButton) nextButton.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
    if (prevButton) prevButton.addEventListener('click', () => { prevSlide(); startAutoSlide(); });

    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    if (navToggle) navToggle.addEventListener('click', toggleMobileNav);

    if (mobileNav) {
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMobileNav();
    });

    setupModalListeners();
}

function initCarousel() {
    setupEventListeners();
    startAutoSlide();
}

window.onload = initCarousel;