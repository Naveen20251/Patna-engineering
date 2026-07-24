// Preloader
window.addEventListener("load", () => {
  const loader = document.getElementById("preloader");
  if (loader) loader.style.display = "none";
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Back-to-Top button show/hide + smooth scroll
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});
backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form validation + success message
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address.");
    return;
  }

  document.getElementById("formSuccess").classList.remove("d-none");
  document.getElementById("contactForm").reset();

  // Google Analytics Conversion Event
  if (typeof gtag === "function") {
    gtag('event', 'form_submission', {
      'event_category': 'Contact',
      'event_label': 'Contact Form',
      'value': 1
    });
  }
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// ✅ Quote Form Validation
document.getElementById("quoteForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const project = document.getElementById("project").value.trim();
  const location = document.getElementById("location").value.trim();

  if (!name || !email || !phone || !project || !location) {
    alert("Please fill in all required fields.");
    return;
  }

  // Show success message
  document.getElementById("quoteSuccess").classList.remove("d-none");
  document.getElementById("quoteForm").reset();

  // Optional: Google Analytics Event
  if (typeof gtag === "function") {
    gtag('event', 'form_submission', {
      'event_category': 'Quote',
      'event_label': 'Free Quote Form',
      'value': 1
    });
  }
});

// Active link highlight on scroll
window.addEventListener("scroll", () => {
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll(".nav-link");

  sections.forEach(section => {
    let top = window.scrollY;
    let offset = section.offsetTop - 100;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        document.querySelector(".nav-link[href='#" + id + "']").classList.add("active");
      });
    }
  });
});

document.getElementById("quoteForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Show loading spinner
  document.getElementById("loadingSpinner").classList.remove("d-none");
  document.getElementById("quoteSuccess").classList.add("d-none");
  document.getElementById("quoteError").classList.add("d-none");

  var formData = {
    Name: document.getElementById("name").value,
    Email: document.getElementById("email").value,
    Phone: document.getElementById("phone").value,
    ProjectType: document.getElementById("projectType").value,
    Location: document.getElementById("location").value,
    Area: document.getElementById("area").value,
    Message: document.getElementById("message").value
  };

  fetch("https://script.google.com/macros/s/AKfycbxDo6vqeUQpYaJf8BFIPk4-9T7eHS2PGkP_emOXK5GeM56bqWEygQaGGOyz0EP_h6ZFBA/exec", {
    method: "POST",
    body: JSON.stringify(formData)
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById("loadingSpinner").classList.add("d-none");
    document.getElementById("quoteSuccess").classList.remove("d-none");
    document.getElementById("quoteForm").reset();
  })
  .catch(error => {
    document.getElementById("loadingSpinner").classList.add("d-none");
    document.getElementById("quoteError").classList.remove("d-none");
    console.error("Error:", error);
  });
});

