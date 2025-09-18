// This should run after the navbar is loaded
function setActiveNav() {
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }
  const navLinks = document.querySelectorAll("a[href]");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

function initNavbar() {
  const menuIcon = document.getElementById("menu-icon");
  const sidebar = document.getElementById("sidebar");

  if (menuIcon && sidebar) {
    menuIcon.addEventListener("click", () => {
      menuIcon.classList.toggle("active");
      sidebar.classList.toggle("open");
    });
  }

  // Optional: close sidebar on link click
  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
      menuIcon.classList.remove("active");
    });
  });
}

function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  // Get saved theme or default to 'dark'
  let saved = localStorage.getItem("theme") || "dark";

  // Apply theme
  document.documentElement.setAttribute("data-theme", saved);
  toggle.textContent = saved === "dark" ? "☀️" : "🌙";

  // On toggle click
  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", next);
    toggle.textContent = next === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", next);
    console.log("Theme changed to:", next);
  });
}

const target = document.getElementById("animated-text");

// Words to loop through
const textArray = ["Front-End Developer", "Web Designer", "Problem Solver"];

let i = 0,
  j = 0;
let currentWord = "";
let isDeleting = false;
let typingSpeed = 120;

function typeEffect() {
  currentWord = textArray[j];

  if (!isDeleting) {
    // Typing
    target.textContent = currentWord.substring(0, i + 1);
    i++;

    if (i === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000); // wait before deleting
      return;
    }
  } else {
    // Deleting
    target.textContent = currentWord.substring(0, i - 1);
    i--;

    if (i === 0) {
      isDeleting = false;
      j = (j + 1) % textArray.length; // move to next word
    }
  }

  setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed);
}

// Start the effect
typeEffect();

const quotes = [
  {
    text: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
  {
    text: "Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
];

let index = 0;

function showQuote() {
  const quoteEl = document.getElementById("quote");
  const authorEl = document.getElementById("author");
  const box = document.getElementById("quote-box");

  // Fade out
  box.classList.remove("show");

  setTimeout(() => {
    // Update quote content
    quoteEl.textContent = quotes[index].text;
    authorEl.textContent = `– ${quotes[index].author}`;

    // Fade in
    box.classList.add("show");

    index = (index + 1) % quotes.length;
  }, 600);
}

showQuote();
setInterval(showQuote, 5000);

// Load footer from external file
function loadFooter() {
  const footerContainer = document.getElementById("footer");

  if (footerContainer) {
    fetch("footer.html")
      .then((res) => res.text())
      .then((html) => {
        footerContainer.innerHTML = html;
      });
  }
}
