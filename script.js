// Toggle button functionality to expand/collapse content
document.querySelectorAll(".toggle-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const para = button.previousElementSibling;
    para.classList.toggle("expanded");
    
    const icon = button.querySelector('i');
    if (icon) {
      icon.className = para.classList.contains("expanded") 
        ? 'fas fa-chevron-up' 
        : 'fas fa-chevron-down';
    }
    
    button.textContent = para.classList.contains("expanded") 
      ? 'Show less ' 
      : 'Show more ';
    if (icon) button.appendChild(icon);
  });
});

// Function to create animated stars on the page
function createStars() {
  const starsCount = 50;
  const body = document.body;

  for (let i = 0; i < starsCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 3 + 1;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * document.body.scrollHeight;
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 3;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${posX}px`;
    star.style.top = `${posY}px`;
    star.style.animationDelay = `${delay}s`;
    star.style.animationDuration = `${duration}s`;

    body.appendChild(star);
  }
}

// Function to scroll terminal down when new content is added
function scrollTerminalDown() {
  const terminalContent = document.getElementById('content');
  terminalContent.scrollTop = terminalContent.scrollHeight;
}

// Modify addOutput function to include scrolling
function addOutput(text, className = '') {
  const div = document.createElement('div');
  if (className) {
    div.className = className;
  }
  div.textContent = text;
  content.appendChild(div);
  scrollTerminalDown(); // Scroll down after adding new content
}

// DOMContentLoaded event to initialize various features
document.addEventListener("DOMContentLoaded", () => {
  const cursorTrail = document.querySelector(".cursor-trail");
  document.addEventListener("mousemove", (e) => {
    cursorTrail.style.left = `${e.clientX}px`;
    cursorTrail.style.top = `${e.clientY}px`;
    cursorTrail.style.opacity = "3";

    setTimeout(() => {
      cursorTrail.style.opacity = "0";
      cursorTrail.style.transform = "translate(-50%, -50%) scale(0.5)";
    }, 100);

    setTimeout(() => {
      cursorTrail.style.transform = "translate(-50%, -50%) scale(1)";
    }, 200);
  });

  const backToTopBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".project, .contact-card, section"
    );
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  document
    .querySelectorAll(".project, .contact-card, section")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); 
});

// Event listener for window load to create stars
window.addEventListener("load", createStars);

// Event listener for window resize to recreate stars
window.addEventListener("resize", () => {
  document.querySelectorAll(".star").forEach((star) => star.remove());
  createStars();
});
