// Sticky header
const header = document.getElementById('header');
let lastScrollY = window.scrollY;
let isSticky = true; // header is visible at start

// Ensure header is visible initially
gsap.set(header, { y: 0, opacity: 1 });

window.addEventListener('scroll', () => {
    if (window.scrollY < lastScrollY) {
        // scrolling up
        if (!isSticky) {
            gsap.to(header, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
            isSticky = true;
        }
    } else {
        // scrolling down
        if (isSticky) {
            gsap.to(header, { y: -80, opacity: 0, duration: 0.4, ease: "power2.in" });
            isSticky = false;
        }
    }
    lastScrollY = window.scrollY;
});





// Home page hero slider
const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
});