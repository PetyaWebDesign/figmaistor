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
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    },
});


  
  
document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins if needed
    if (typeof gsap !== "undefined" && gsap.registerPlugin) {
      try { gsap.registerPlugin(Flip); } catch(e) { /* ok if Flip not used */ }
    }
  
    // ================
    // Sticky header
    // ================
    const header = document.getElementById("header");
    let lastScrollY = window.scrollY;
    let isSticky = true;
    if (header && typeof gsap !== "undefined") {
      gsap.set(header, { y: 0, opacity: 1 });
      window.addEventListener("scroll", () => {
        if (window.scrollY < lastScrollY) {
          if (!isSticky) {
            gsap.to(header, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
            isSticky = true;
          }
        } else {
          if (isSticky) {
            gsap.to(header, { y: -80, opacity: 0, duration: 0.4, ease: "power2.in" });
            isSticky = false;
          }
        }
        lastScrollY = window.scrollY;
      });
    }
  
    // ================
    // Swiper init
    // ================
    try {
      const swiper = new Swiper(".swiper", {
        loop: true,
        slidesPerView: 1,
        pagination: { el: ".swiper-pagination" },
      });
    } catch (err) { /* swiper missing or not on page */ }
  
    // ================
    // Helper: find the closest non-zero border-radius (walk up DOM)
    // ================
    function findClosestBorderRadius(el) {
      let cur = el;
      while (cur && cur !== document.documentElement) {
        const rs = window.getComputedStyle(cur).borderRadius;
        if (rs && !/^(0px|0|none|0%|0px 0px 0px 0px)$/.test(rs)) return rs;
        cur = cur.parentElement;
      }
      return "0px";
    }
  
    // ================
    // Cart fly-to animation (button triggers, image-wrap flies)
    // ================
    const cartIcon = document.querySelector(".cart-icon");
    const quantityEl = document.querySelector(".cart .quantity");
  
    // Use event delegation in case cards are added dynamically:
    document.body.addEventListener("click", (e) => {
      const btn = e.target.closest && e.target.closest(".beer-card .btn.buy");
      if (!btn) return;
  
      e.preventDefault();
  
      // find the corresponding card and image-wrap
      const card = btn.closest(".beer-card");
      if (!card) return console.warn("No .beer-card found for buy button");
  
      const imgWrap = card.querySelector(".image-wrap");
      if (!imgWrap) return console.warn("No .image-wrap found inside card");
  
      const img = imgWrap.querySelector("img");
      if (!img) return console.warn("No <img> inside .image-wrap");
  
      if (!cartIcon || !quantityEl) {
        console.warn("Cart selectors not found (.cart .cart-icon or .cart .quantity)");
        return;
      }
  
      // get geometry
      const rect = imgWrap.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();
  
      // clone the whole wrapper (so border-radius + overflow:hidden are preserved)
      const clone = imgWrap.cloneNode(true);
  
      // ensure inner img fills the clone exactly (prevents layout differences)
      const cloneImg = clone.querySelector("img");
      if (cloneImg) {
        cloneImg.style.width = "100%";
        cloneImg.style.height = "100%";
        cloneImg.style.objectFit = getComputedStyle(img).objectFit || "cover";
        cloneImg.style.display = "block";
        cloneImg.style.pointerEvents = "none";
      }
  
      // copy borderRadius & clipPath from the closest relevant element
      const borderRadius = findClosestBorderRadius(imgWrap);
      const computed = window.getComputedStyle(imgWrap);
      const clipPath = computed.clipPath && computed.clipPath !== "none" ? computed.clipPath : null;
  
      // prepare clone style for animation
      clone.style.position = "fixed";
      clone.style.left = rect.left + "px";
      clone.style.top = rect.top + "px";
      clone.style.width = rect.width + "px";
      clone.style.height = rect.height + "px";
      clone.style.zIndex = 9999;
      clone.style.overflow = "hidden"; // ensure rounding masks image
      clone.style.borderRadius = borderRadius;
      clone.style.pointerEvents = "none";
      if (clipPath) clone.style.clipPath = clipPath;
  
      document.body.appendChild(clone);
  
      // compute deltas (center the small final thumbnail inside the cart icon)
      const targetSize = 30; // final thumbnail size in px
      const targetX = cartRect.left + (cartRect.width / 2) - (targetSize / 2);
      const targetY = cartRect.top + (cartRect.height / 2) - (targetSize / 2);
      const deltaX = targetX - rect.left;
      const deltaY = targetY - rect.top;
  
      // animate
      if (typeof gsap === "undefined") {
        // fallback: just remove clone and update quantity
        setTimeout(() => clone.remove(), 400);
      } else {
        gsap.to(clone, {
          x: deltaX,
          y: deltaY,
          width: targetSize,
          height: targetSize,
          borderRadius: borderRadius, // keeps the same radius value during animation
          opacity: 0.9,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => clone.remove(),
        });
      }
  
      // update quantity safely
      let quantity = parseInt(quantityEl.textContent || "0", 10);
      if (isNaN(quantity)) quantity = 0;
      quantityEl.textContent = quantity + 1;
  
      // small bump effect
      if (typeof gsap !== "undefined") {
        gsap.fromTo(quantityEl, { scale: 1 }, { scale: 1.3, duration: 0.18, yoyo: true, repeat: 1 });
      }
    });
});
  
  
  
function toggleDropdown(header) {
    const options = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');
    options.classList.toggle('open');
    arrow.classList.toggle('rotate');
  }

  // login form
const formValidation = () => {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('.login-form');
  
        form.addEventListener('submit', function(e) {
          e.preventDefault(); 
  
          let valid = true;
  
          form.querySelectorAll('.form-row').forEach(row => {
            const input = row.querySelector('input');
            const errorMsg = row.querySelector('.error-msg');
  
            row.classList.remove('error');
            errorMsg.style.display = 'none';

            if (!input.value.trim()) {
              row.classList.add('error');
              errorMsg.style.display = 'block';
              valid = false;
            } 

            else if (input.type === 'email' && !input.checkValidity()) {
              row.classList.add('error');
              errorMsg.style.display = 'block';
              valid = false;
            }
          });
  
          if (valid) {
            alert('Формата е валидна! 🎉');
          }
        });
      });
}
formValidation()