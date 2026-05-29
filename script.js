const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelectorAll(".nav-links a");
const pageHeader = document.querySelector(".site-header, .daily-site-header");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const syncNavTone = () => {
  if (!nav || !pageHeader) {
    return;
  }

  nav.classList.toggle("is-solid", window.scrollY > 80);
};

syncNavTone();
window.addEventListener("scroll", syncNavTone, { passive: true });
window.addEventListener("resize", syncNavTone);
