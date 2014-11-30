$(document).on('ready', function() {
  var canvas = $("#snake")[0];
  var context = canvas.getContext("2d");

  var width = $("#snake").width();
  var height = $("#snake").height();

  var cellWidth = 10;
  var d;
  var food;
  var score;
  var deaths = 0;
  var meters;
  var level = 20;
  var background = 'black';
  var border = 'white';
  var snakeColor = 'white';
  var snake;

  function init()
  {
    d = "right";
    createSnake();
    createFood();
    score = 0;
    meters = 0
    if(typeof gameLoop != "undefined") {
      clearInterval(gameLoop);
    }

    gameLoop = setInterval(paint, 1000 / level);
  }

  init();

  function createSnake()
  {
    deaths += 1;
    var length = 5;
    snake = [];

    for(var i = length - 1; i >= 0; i--)
    {
      snake.push({ x: i, y: 0 });
    }
  }

  function createFood()
  {
    food = {
      x: Math.round(Math.random() * (width - cellWidth) / cellWidth),
      y: Math.round(Math.random() * (height - cellWidth) / cellWidth),
    };
  }

  function paint()
  {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
    context.strokeStyle = border;
    context.strokeRect(0, 0, width, height);

    var nx = snake[0].x;
    var ny = snake[0].y;

    if (d == "right") {
      nx++;
    } else if (d == "left") {
      nx--;
    } else if (d == "up") {
      ny--;
    } else if (d == "down") {
      ny++;
    }

    if (nx == -1 || nx == width / cellWidth || ny == -1 || ny == height / cellWidth || checkCollision(nx, ny, snake)) {
      init();

      return;
    }

    if(nx == food.x && ny == food.y) {
      var tail = {
        x: nx,
        y: ny
      };

      score++;

      createFood();
    } else {
      var tail = snake.pop();

      tail.x = nx;
      tail.y = ny;
    }

    snake.unshift(tail);

    for(var i = 0; i < snake.length; i++) {
      var c = snake[i];

      paintCell(c.x, c.y);
    }

    paintCell(food.x, food.y);
  }

  function paintCell(x, y)
  {
    context.fillStyle = snakeColor;
    context.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
    context.strokeStyle = background;
    context.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
  }

  function checkCollision(x, y, array)
  {
    for(var i = 0; i < array.length; i++)
    {
      if(array[i].x == x && array[i].y == y) {
        deaths += 1;
        return true;
      }
    }
    meters += 1;
    return false;
  }

  $(document).on('keydown', function(e) {
    var key = e.which;

    if (key == "37" && d != "right") {
      d = "left";
    } else if (key == "38" && d != "down") {
      d = "up";
    } else if (key == "39" && d != "left") {
      d = "right";
    } else if (key == "40" && d != "up") {
      d = "down";
    }
  });
});