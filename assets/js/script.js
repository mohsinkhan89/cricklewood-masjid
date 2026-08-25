const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dotsWrap = document.querySelector(".slider-dots");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const menuToggle = document.querySelector(".menu-toggle");
const mainMenu = document.querySelector(".main-menu");
let currentSlide = 0;
let timer;

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });

  document.querySelectorAll(".slider-dots button").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentSlide);
  });
}

function startSlider() {
  if (slides.length < 2) return;
  clearInterval(timer);
  timer = setInterval(() => showSlide(currentSlide + 1), 6000);
}

if (dotsWrap) {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => {
      showSlide(index);
      startSlider();
    });
    dotsWrap.appendChild(dot);
  });
}

prevBtn?.addEventListener("click", () => {
  showSlide(currentSlide - 1);
  startSlider();
});

nextBtn?.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  startSlider();
});

menuToggle?.addEventListener("click", () => {
  const isOpen = mainMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".amount-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".amount-grid button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

const revealTargets = document.querySelectorAll(
  ".section-title, .feature-card, .news-card, .event-item, .services article, .donation-box, .newsletter-box, .visit, .quick-panels a, .footer-modern > *, .footer-bottom"
);

revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

showSlide(0);
startSlider();


function playLordIcon(icon) {
  if (!icon) return;

  if (typeof icon.playFromBeginning === "function") {
    icon.playFromBeginning();
    return;
  }

  if (typeof icon.play === "function") {
    icon.play();
    return;
  }

  icon.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true, view: window }));
  icon.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, view: window }));
}

function stopLordIcon(icon) {
  if (!icon) return;

  if (typeof icon.stop === "function") {
    icon.stop();
    return;
  }

  icon.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true, view: window }));
  icon.dispatchEvent(new MouseEvent("mouseout", { bubbles: true, view: window }));
}

function enableParentLordIconHover() {
  const hoverParents = document.querySelectorAll(
    ".btn-modern, .services article, .quick-panels a, .footer-contact-card, .footer-socials a"
  );

  hoverParents.forEach((parent) => {
    const icons = parent.querySelectorAll("lord-icon");
    if (!icons.length) return;

    parent.addEventListener("mouseenter", () => icons.forEach(playLordIcon));
    parent.addEventListener("focusin", () => icons.forEach(playLordIcon));
    parent.addEventListener("mouseleave", () => icons.forEach(stopLordIcon));
  });
}

enableParentLordIconHover();
