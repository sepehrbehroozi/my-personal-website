// Toggle button functionality to expand/collapse content
document.querySelectorAll(".toggle-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const para = button.closest(".project").querySelector(".bullet-container");
    para.classList.toggle("expanded");

    const icon = button.querySelector("i");
    if (icon) {
      icon.className = para.classList.contains("expanded")
        ? "fas fa-chevron-up"
        : "fas fa-chevron-down";
    }

    button.textContent = para.classList.contains("expanded")
      ? "Show less "
      : "Show more ";
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
  const terminalContent = document.getElementById("content");
  terminalContent.scrollTop = terminalContent.scrollHeight;
}

// Modify addOutput function to include scrolling
function addOutput(text, className = "") {
  const div = document.createElement("div");
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

  const resumeButton = document.getElementById("resume-button");
  const resumeDropdown = document.querySelector(".resume-dropdown");

  // Toggle dropdown on click
  resumeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const isVisible = resumeDropdown.style.display === "block";
    resumeDropdown.style.display = isVisible ? "none" : "block";
  });

  // Close dropdown when clicking elsewhere
  document.addEventListener("click", () => {
    resumeDropdown.style.display = "none";
  });
});

// Event listener for window load to create stars
window.addEventListener("load", createStars);

// Event listener for window resize to recreate stars
window.addEventListener("resize", () => {
  document.querySelectorAll(".star").forEach((star) => star.remove());
  createStars();
});

// Minesweeper game variables
const minesweeperContainer = document.getElementById("minesweeper");
const minesweeperBoard = document.getElementById("minesweeper-board");
const minesweeperMessage = document.getElementById("minesweeper-message");
const minesweeperReset = document.getElementById("minesweeper-reset");
const explosion = document.getElementById("explosion");

let boardSize = 10;
let mineCount = 15;
let board = [];
let revealed = [];
let flagged = [];
let gameOver = false;

// Initialize Minesweeper game
function initMinesweeper() {
  board = [];
  revealed = [];
  flagged = [];
  gameOver = false;
  minesweeperBoard.innerHTML = "";
  minesweeperMessage.textContent =
    "Click to reveal cells. Right-click to flag.";

  // Reset explosion effects
  document.getElementById("explosion-overlay").style.display = "none";
  document.getElementById("game-over-message").style.display = "none";
  document.querySelector(".terminal-container").style.animation = "";

  // Create empty board
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    revealed[i] = [];
    flagged[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = 0;
      revealed[i][j] = false;
      flagged[i][j] = false;
    }
  }

  // Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);

    if (board[x][y] !== -1) {
      board[x][y] = -1;
      minesPlaced++;

      // Increment counts around the mine
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          if (
            nx >= 0 &&
            nx < boardSize &&
            ny >= 0 &&
            ny < boardSize &&
            board[nx][ny] !== -1
          ) {
            board[nx][ny]++;
          }
        }
      }
    }
  }

  // Create board UI
  minesweeperBoard.style.gridTemplateColumns = `repeat(${boardSize}, 30px)`;

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.className = "minesweeper-cell";
      cell.dataset.x = i;
      cell.dataset.y = j;
      cell.style.width = "30px";
      cell.style.height = "30px";
      cell.style.backgroundColor = "#333";
      cell.style.border = "1px solid #0f0";
      cell.style.display = "flex";
      cell.style.justifyContent = "center";
      cell.style.alignItems = "center";
      cell.style.cursor = "pointer";
      cell.style.fontSize = "12px";

      cell.addEventListener("click", () => handleCellClick(i, j));
      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        handleRightClick(i, j);
      });

      minesweeperBoard.appendChild(cell);
    }
  }
}

function handleCellClick(x, y) {
  if (gameOver || revealed[x][y] || flagged[x][y]) return;

  if (board[x][y] === -1) {
    // Mine clicked - game over
    revealAllMines();
    showExplosion(x, y);
    minesweeperMessage.textContent = "BOOM! Game Over!";
    gameOver = true;
    return;
  }

  revealCell(x, y);

  if (checkWin()) {
    minesweeperMessage.textContent = "Congratulations! You won!";
    gameOver = true;
  }
}

function handleRightClick(x, y) {
  if (gameOver || revealed[x][y]) return;

  flagged[x][y] = !flagged[x][y];
  const cell = getCellElement(x, y);

  if (flagged[x][y]) {
    cell.textContent = "🚩";
    cell.style.color = "#f00";
  } else {
    cell.textContent = "";
  }
}

function revealCell(x, y) {
  if (revealed[x][y] || flagged[x][y]) return;

  revealed[x][y] = true;
  const cell = getCellElement(x, y);
  cell.style.backgroundColor = "#111";

  if (board[x][y] > 0) {
    cell.textContent = board[x][y];
    // Different colors for different numbers
    const colors = [
      "",
      "#00f",
      "#0a0",
      "#f00",
      "#00a",
      "#a00",
      "#0aa",
      "#000",
      "#888",
    ];
    cell.style.color = colors[board[x][y]] || "#fff";
  } else {
    // Reveal adjacent cells if this is an empty cell
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize) {
          revealCell(nx, ny);
        }
      }
    }
  }
}

function revealAllMines() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === -1) {
        const cell = getCellElement(i, j);
        cell.textContent = "💣";
        cell.style.backgroundColor = "#f00";
      }
    }
  }
}

function checkWin() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] !== -1 && !revealed[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function getCellElement(x, y) {
  return document.querySelector(
    `.minesweeper-cell[data-x="${x}"][data-y="${y}"]`
  );
}

function showExplosion(x, y) {
  // Show the cell explosion
  const cell = getCellElement(x, y);
  cell.textContent = "💣";
  cell.style.backgroundColor = "#f00";
  cell.style.color = "#000";
  cell.style.fontSize = "20px";

  // Show the full-screen explosion
  const explosionOverlay = document.getElementById("explosion-overlay");
  const gameOverMessage = document.getElementById("game-over-message");

  explosionOverlay.style.display = "block";
  gameOverMessage.style.display = "block";

  // Shake the terminal container
  const terminalContainer = document.querySelector(".terminal-container");
  terminalContainer.style.animation = "textShake 0.2s linear infinite";

  // Hide after animation
  setTimeout(() => {
    explosionOverlay.style.display = "none";
    gameOverMessage.style.display = "none";
    terminalContainer.style.animation = "";
  }, 2000);

  // Reveal all mines
  revealAllMines();
}
