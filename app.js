console.log('ready')

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 600;
canvas.width = 600;
ctx.lineWidth = 8;

let squares = [{
  x: 0,
  y: 0,
  width: 600,
  height: 600
}];
console.table(squares)


function splitSquaresAt(coordinates) {
  const { x, y } = coordinates;
  console.log(x, y);

  for (var i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];

    console.log(x, square.x, square.width, square)
    if (x && x > square.x && x < square.x + square.width) {
      // delete square, to replace with half-size A and B
      squares.splice(i, 1);
      splitOnX(square, x);
      console.table(squares)
    }
    
    if (y && y > square.y && y < square.y + square.height) {
      squares.splice(i, 1);
      splitOnY(square, y);
      console.table(squares)
    }
  }
}

function splitOnX(square, splitAt) {
  console.log('splittingX')
  const squareA = {
    x: square.x,
    y: square.y,
    width: splitAt + square.x,
    height: square.height
  }
  const squareB = {
    x: splitAt,
    y: square.y,
    width: square.width- splitAt,
    height: square.height
  }

  squares.push(squareA);
  squares.push(squareB);
}

function splitOnY(square, splitAt) {
  console.log('splittingY')
  const squareA = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: splitAt + square.y
  }
  const squareB = {
    x: square.x,
    y: splitAt,
    width: square.width,
    height: square.height - splitAt
  }

  squares.push(squareA);
  squares.push(squareB);
}

function draw() {
  for (let i = 0; i < squares.length; i++) {
    ctx.beginPath();
    ctx.rect(
      squares[i].x,
      squares[i].y,
      squares[i].width,
      squares[i].height,
    );
    ctx.stroke();
  }
}

splitSquaresAt({ x: 200 });
splitSquaresAt({ y: 250 })


draw();