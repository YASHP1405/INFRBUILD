const toggle = document.getElementById("themeToggle");

const setInitialTheme = () => {
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  if (prefersLight) {
    document.body.classList.add("light");
    toggle.innerHTML = "☀️";
  } else {
    toggle.innerHTML = "🌙";
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
        successMsg.style.display = "block";
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

modalOverlay.addEventListener("click", () => {
  const activeModal = document.querySelector(".modal.active");
  if (activeModal) {
    closeModal(activeModal);
  }
});

document.querySelectorAll(".close-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (!modal) return;
  modal.classList.add("active");
  modalOverlay.classList.add("active");
}

function closeModal(modal) {
  if (!modal) return;
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
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.5,
});
