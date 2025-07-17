document.querySelectorAll(".toggle-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const para = button.previousElementSibling;
    para.classList.toggle("expanded");
    button.textContent = para.classList.contains("expanded")
      ? "Show less"
      : "Show more";
  });
});

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

function updateStatusMessage(animate = true) {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 6 is Saturday
  const hours = now.getHours();
  const statusElement = document.getElementById("statusMessage");

  if (animate) {
    statusElement.classList.remove("status-animation");
    void statusElement.offsetWidth; // Trigger reflow
    statusElement.classList.add("status-animation");
  }

  if (day === 6 && hours >= 18) {
    statusElement.textContent = "🏐 Currently playing volleyball";
  } else if (hours >= 17) {
    statusElement.textContent = "💻 Probably coding";
  } else if (hours >= 24 || hours < 6) {
    statusElement.textContent = "🛏️ Probably sleeping";
  } else {
    statusElement.textContent = "🏢 Probably at work";
  }
}

const snakeContainer = document.getElementById('snake-game');
const snakeCanvas = document.getElementById('snake-canvas');
const snakeCtx = snakeCanvas.getContext('2d');
const snakeMessage = document.getElementById('snake-message');
const snakeScore = document.getElementById('snake-score');
const snakeReset = document.getElementById('snake-reset');

let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let gameInterval;
let score = 0;
let gridSize = 20;
let canvasSize = 400;
let tileCount = canvasSize / gridSize;

function initSnakeGame() {
  clearInterval(gameInterval);
  
  snake = [
    {x: 10, y: 10},
    {x: 9, y: 10},
    {x: 8, y: 10}
  ];
  direction = 'right';
  nextDirection = 'right';
  score = 0;
  snakeScore.textContent = score;
  snakeMessage.textContent = 'Use arrow keys to move. Press any arrow to start.';
  
  createFood();
  
  drawSnakeGame();
}

function createFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
  
  for (let i = 0; i < snake.length; i++) {
    if (food.x === snake[i].x && food.y === snake[i].y) {
      createFood();
      return;
    }
  }
}

function drawSnakeGame() {
  snakeCtx.fillStyle = '#000';
  snakeCtx.fillRect(0, 0, canvasSize, canvasSize);
  
  for (let i = 0; i < snake.length; i++) {
    snakeCtx.fillStyle = i === 0 ? '#0f0' : '#0a0';
    snakeCtx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
  }
  
  snakeCtx.fillStyle = '#f00';
  snakeCtx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function updateSnake() {
  const head = {x: snake[0].x, y: snake[0].y};
  
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }
  
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver();
    return;
  }
  
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
      return;
    }
  }
  
  snake.unshift(head);
  
  if (head.x === food.x && head.y === food.y) {
    score++;
    snakeScore.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
  
  direction = nextDirection;
}

function gameOver() {
  clearInterval(gameInterval);
  snakeMessage.textContent = `Game Over! Final Score: ${score}. Press Reset to play again.`;
}

function startSnakeGame() {
  initSnakeGame();
  gameInterval = setInterval(() => {
    updateSnake();
    drawSnakeGame();
  }, 100);
}

function handleSnakeKeyPress(e) {
  if (snakeContainer.style.display !== 'block') return;
  
  if ([37, 38, 39, 40].includes(e.keyCode)) {
    e.preventDefault();
  }
  
  switch (e.keyCode) {
    case 37: 
      if (direction !== 'right') nextDirection = 'left';
      break;
    case 38: 
      if (direction !== 'down') nextDirection = 'up';
      break;
    case 39: 
      if (direction !== 'left') nextDirection = 'right';
      break;
    case 40: 
      if (direction !== 'up') nextDirection = 'down';
      break;
    case 32: 
      if (!gameInterval) startSnakeGame();
      break;
  }
}

snakeReset.addEventListener('click', initSnakeGame);
document.addEventListener('keydown', handleSnakeKeyPress);

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

  updateStatusMessage(true);

  setInterval(() => updateStatusMessage(false), 3600000);

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

window.addEventListener("load", createStars);
window.addEventListener("resize", () => {
  document.querySelectorAll(".star").forEach((star) => star.remove());
  createStars();
});
