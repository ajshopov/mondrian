const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const size = 600;
canvas.height = size;
canvas.width = size;
// var dpr = window.devicePixelRatio;
// console.log(dpr)
ctx.lineWidth = 8;
const step = size / 13;
// let countSplit = 0;
// let countSX = 0;
// let countSY = 0;
const white = '#F2F5F1';
const colors = ['#D40920', '#1356A2', '#F7D842'];


let squares = [{
  x: 0,
  y: 0,
  width: size,
  height: size
}];
// console.table(squares)


function splitSquaresAt(coordinates) {
  const { x, y } = coordinates;
  console.log(x, y);
  // countSplit+=1;

  for (var i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];

    // console.log(x, square.x, square.width, square)
    if (x && x > square.x && x < square.x + square.width) {
      // randomly delete square, to replace with half-size A and B
      if (Math.random() > 0.75) {
        squares.splice(i, 1);
        splitOnX(square, x);
      }
      // console.table(squares)
    }
    
    if (y && y > square.y && y < square.y + square.height) {
      if (Math.random() > 0.75) {
        squares.splice(i, 1);
        splitOnY(square, y);
      }
      // console.table(squares)
    }
  }
}

function splitOnX(square, splitAt) {
  // countSX+=1;
  // console.log('splittingX')
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
  // countSY += 1;
  console.log('splittingY')
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

for (let i = 0; i <= size; i+= step) {
  splitSquaresAt({ y: i });
  splitSquaresAt({ x: i });
}


function draw() {
  console.table(squares)
  for (let i = 0; i < colors.length; i++) {
    squares[Math.floor(Math.random() * squares.length)].color = colors[i];
    console.log(squares)
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




draw();