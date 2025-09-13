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
    pagination: {
        el: '.swiper-pagination',
    },
});

document.querySelectorAll(".purchase-btn").forEach(priceEl => {
    priceEl.addEventListener("click", () => {
      const cartIcon = document.querySelector(".cart-icon");
      const quantityEl = document.querySelector(".cart .quantity");
  
      // clone the element
      const clone = priceEl.cloneNode(true);
      const rect = priceEl.getBoundingClientRect();
  
      clone.style.position = "fixed"; // fixed is better than absolute for scroll
      clone.style.left = rect.left + "px";
      clone.style.top = rect.top + "px";
      clone.style.width = rect.width + "px";
      clone.style.height = rect.height + "px";
      clone.style.zIndex = 1000;
      document.body.appendChild(clone);
  
      // get cart position
      const cartRect = cartIcon.getBoundingClientRect();
  
      // animate to cart
      gsap.to(clone, {
        x: cartRect.left - rect.left,
        y: cartRect.top - rect.top,
        width: 20,
        height: 20,
        opacity: 0.5,
        duration: 0.7,
        ease: "power1.inOut",
        onComplete: () => clone.remove()
      });
  
      // update quantity
      let quantity = parseInt(quantityEl.textContent, 10);
      quantityEl.textContent = quantity + 1;
  
      // small bump effect
      gsap.fromTo(quantityEl, {scale: 1}, {scale: 1.3, duration: 0.2, yoyo: true, repeat: 1});
    });
  });
  
  