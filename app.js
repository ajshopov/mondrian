const button = document.getElementById('regenerate');
const canvas = document.querySelector('canvas');

const lineInput = document.querySelector('.lines input');
const squareInput = document.querySelector('.squares input');

let lines = 0.75;
let grid = 13;
lineInput.addEventListener('input', () => {lines = lineInput.value});
squareInput.addEventListener('input', () => {grid = squareInput.value});

const ctx = canvas.getContext('2d');
const size = 600;
canvas.height = size;
canvas.width = size;
ctx.lineWidth = 8;
const white = '#F2F5F1';
const colors = ['#D40920', '#1356A2', '#F7D842'];
let squares;

button.addEventListener('click', generate)
generate();

function generate() {
  squares = [{
    x: 0,
    y: 0,
    width: size,
    height: size
  }];

  for (let i = 0; i <= size; i+= (size / grid)) {
    splitSquaresAt({ y: i });
    splitSquaresAt({ x: i });
  }

  draw();
}

function draw() {
  for (let i = 0; i < colors.length; i++) {
    squares[Math.floor(Math.random() * squares.length)].color = colors[i];
  }

  for (let i = 0; i < squares.length; i++) {
    ctx.beginPath();
    ctx.rect(
      squares[i].x,
      squares[i].y,
      squares[i].width,
      squares[i].height,
    );
    if (squares[i].color) {
      ctx.fillStyle = squares[i].color;
    } else {
      ctx.fillStyle = white;
    }
    ctx.fill();
    ctx.stroke();
  }
}

function splitSquaresAt(coordinates) {
  const { x, y } = coordinates;

  for (var i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];

    if (x && x > square.x && x < square.x + square.width) {
      // randomly delete square, to replace with half-size A and B
      if (Math.random() > lines) {
        squares.splice(i, 1);
        splitOnX(square, x);
      }
    }

    if (y && y > square.y && y < square.y + square.height) {
      if (Math.random() > lines) {
        squares.splice(i, 1);
        splitOnY(square, y);
      }
    }
  }
}

function splitOnX(square, splitAt) {
  const squareA = {
    x: square.x,
    y: square.y,
    width: splitAt - square.x,
    height: square.height
  }
  const squareB = {
    x: splitAt,
    y: square.y,
    width: square.x + square.width - splitAt,
    height: square.height
  }
  squares.push(squareA);
  squares.push(squareB);
}

function splitOnY(square, splitAt) {
  const squareA = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: splitAt - square.y
  }
  const squareB = {
    x: square.x,
    y: splitAt,
    width: square.width,
    height: square.y + square.height - splitAt
  }
  squares.push(squareA);
  squares.push(squareB);
}
