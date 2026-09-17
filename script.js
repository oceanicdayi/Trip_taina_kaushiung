const header = document.querySelector(".site-header");
const progressBar = document.querySelector(".reading-progress span");
const daySections = [...document.querySelectorAll(".day-section")];
const dayLinks = [...document.querySelectorAll(".nav-days a")];

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? (scrollTop / scrollRange) * 100 : 0;

  header?.classList.toggle("scrolled", scrollTop > 20);
  if (progressBar) progressBar.style.width = `${progress}%`;
}

const dayObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    dayLinks.forEach((link) => {
      link.classList.toggle("active", link.hash === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-20% 0px -60% 0px",
    threshold: [0, 0.2, 0.5],
  },
);

daySections.forEach((section) => dayObserver.observe(section));

document.querySelectorAll(".note-grid details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;

    document.querySelectorAll(".note-grid details").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();
