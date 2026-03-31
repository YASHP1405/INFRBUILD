// ================= THEME TOGGLE =================
const toggle = document.getElementById("themeToggle");

const setInitialTheme = () => {
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  if (prefersLight) {
    document.body.classList.add("light");
    if (toggle) toggle.innerHTML = "☀️";
  } else {
    if (toggle) toggle.innerHTML = "🌙";
  }
};

toggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    toggle.innerHTML = "☀️";
  } else {
    toggle.innerHTML = "🌙";
  }
});

setInitialTheme();

// ================= HAMBURGER MOBILE MENU =================
const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("mainNav");

// Create overlay element for mobile nav
const navOverlay = document.createElement("div");
navOverlay.className = "nav-overlay";
document.body.appendChild(navOverlay);

function toggleMobileNav() {
  hamburger.classList.toggle("active");
  mainNav.classList.toggle("open");
  navOverlay.classList.toggle("active");
  document.body.style.overflow = mainNav.classList.contains("open") ? "hidden" : "";
}

function closeMobileNav() {
  hamburger.classList.remove("active");
  mainNav.classList.remove("open");
  navOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (hamburger) {
  hamburger.addEventListener("click", toggleMobileNav);
}

// Close mobile nav when overlay is clicked
navOverlay.addEventListener("click", closeMobileNav);

// Close mobile nav when a link is clicked
if (mainNav) {
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileNav);
  });
}

// Close mobile nav on window resize (if going back to desktop)
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    closeMobileNav();
  }
});

// ================= CONTACT FORM =================
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const button = form.querySelector("button");
    const successMsg = form.querySelector(".form-success");

    button.classList.add("loading");

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        form.reset();
        if (successMsg) successMsg.style.display = "block";
      } else {
        alert("Something went wrong. Please try again.");
      }

    } catch (error) {
      alert("Network error. Please try later.");
    }

    button.classList.remove("loading");
  });
}

// ================= MODAL =================
const productCards = document.querySelectorAll(".product-card");
const modalOverlay = document.getElementById("modal-overlay");

productCards.forEach(card => {
  card.addEventListener("click", () => {
    const modalId = card.dataset.modal;
    const modal = document.getElementById(modalId);
    openModal(modal);
  });
});

if (modalOverlay) {
  modalOverlay.addEventListener("click", () => {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal) {
      closeModal(activeModal);
    }
  });
}

document.querySelectorAll(".close-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (!modal || !modalOverlay) return;
  modal.classList.add("active");
  modalOverlay.classList.add("active");
}

function closeModal(modal) {
  if (!modal || !modalOverlay) return;
  modal.classList.remove("active");
  modalOverlay.classList.remove("active");
}

// ================= SCROLL REVEAL =================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => observer.observe(el));

// ================= TILT EFFECT =================
if (typeof VanillaTilt !== "undefined") {
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
  });
}
