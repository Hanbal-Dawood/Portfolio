// This should run after the navbar is loaded
function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("a[href]");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (href === "index.html" && currentPage === "")) {
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
const text = "front-end  developer";

[...text].forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  setTimeout(() => {
    span.style.opacity = "1";
    // span.style.transform = "translateY(0)";
  }, 200 * i); // ← slow typing speed
  target.appendChild(span);
});

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
