let snake = [
  { x: 380, y: 280 },
  { x: 380, y: 260 },
  { x: 380, y: 240 },
  { x: 380, y: 220 }
];

var deltaX = 20;
var deltaY = 0;
var running = false;
var direction = 2; //Directions: 0 = left, 1 = up, 2 = right, 3 = down.
var score = 0;

function drawSnake() {
  const head = { x: snake[0].x + deltaX, y: snake[0].y + deltaY };
  snake.unshift(head);
  snake.pop();

  //Collision mechanics
  if (snake[0].x <= -15 || snake[0].y <= -15 || snake[0].x >= 760 || snake[0].y >= 460) { //760 - snake size = 745. 460 - snake size = 445
    gameOver();
  }
  for (var i = 1; i <= snake.length - 1; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      gameOver();
    }
  }

  this.ctx.fillStyle = "#00e600";
  this.ctx.fillRect(0, 0, canvas.width, canvas.height)
  this.ctx.fillStyle = "#FF0000";
  this.ctx.fillRect(snake[0].x, snake[0].y, 15, 15);
  for (var i = 0; i <= snake.length - 1; i++) { //draw tail of snake
    this.ctx.fillRect(snake[i].x, snake[i].y, 15, 15);
  }

  ctx.font = "18px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 670, 450);
  eatFood();
  drawFood();
}

function gameStart() {
  score = 0;
  snake = [
    { x: 380, y: 280 },
    { x: 380, y: 260 },
    { x: 380, y: 240 },
    { x: 380, y: 220 }
  ];

  this.interval = setInterval(drawSnake, 100);
  // Canvas width: 760 / 20 = 38
  // Canvas height: 460 / 20 = 23
  pos = { x: 20 * (Math.floor(Math.random() * 37) + 1), y: 20 * (Math.floor(Math.random() * 22) + 1) }
  drawFood();
}

function gameOver() {
  this.ctx.fillText("GAME OVER", 200, 200);

  clearInterval(interval);

  console.log("GAME OVER");
  running = false;

}

function gameInit() {
  canvas = document.getElementById("game_canvas");
  canvas.width = 760;
  canvas.height = 460;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "#00e600";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FF0000";
  this.ctx.fillRect(snake[0].x, snake[0].y, 15, 15);
  this.ctx.fillRect(snake[1].x, snake[1].y, 15, 15);
  this.ctx.fillRect(snake[2].x, snake[2].y, 15, 15);
  this.ctx.fillRect(snake[3].x, snake[3].y, 15, 15);

  // TITLE TEXT
  ctx.font = "80px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("SNAKE", 250, 180);

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Press space bar to start", 280, 345);

  ctx.font = "18px Arial";
  ctx.fillText("Use arrow keys to move", 290, 375);
}

//Basic keycode checking for arrow keys.
document.onkeydown = checkKeycode;
function checkKeycode(event) {
  var keyDownEvent = event || window.event,
    keycode = keyDownEvent.which ? keyDownEvent.which : keyDownEvent.keycode;

  move(keycode);

  return false;
}

function move(keyCodeNum) {
  switch (keyCodeNum) {
    case 37: //left arrow keycode = 38
      if (direction != 2) {
        deltaX = -20;
        deltaY = 0;
        direction = 0;
        break;
      } else {
        break;
      }
    case 38: //up arrow keycode = 38
      if (direction != 3) {
        deltaX = 0;
        deltaY = -20
        direction = 1;
        break;
      } else {
        break;
      }
    case 39: //right arrow keycode = 38
      if (direction != 0) {
        deltaX = 20;
        deltaY = 0;
        direction = 2;
        break;
      } else {
        break;
      }
    case 40: //down arrow keycode = 38
      if (direction != 1) {
        deltaX = 0;
        deltaY = 20;
        direction = 3;
        break;
      } else {
        break;
      }
    case 32: //Space bar starts game, but is disabled while game is running.
      if (running == false) {
        gameStart();
        running = true;
        break;
      } else {
        break;
      }
  }
}


// Food rendering
var pos;

function drawFood() {
  this.ctx.fillStyle = "#ffffff";
  this.ctx.fillRect(this.pos.x, this.pos.y, 15, 15)
}

function eatFood() {
  if (snake[0].x == this.pos.x && snake[0].y == this.pos.y) {
    pos = { x: 20 * (Math.floor(Math.random() * 37) + 1), y: 20 * (Math.floor(Math.random() * 21) + 1) }
    const tailEnd = snake.length - 1;
    const tail = { x: snake[tailEnd].x + deltaX, y: snake[tailEnd].y + deltaY };
    snake.push(tail);
    score++;
  }
}