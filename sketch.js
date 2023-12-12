let squareInfo = [];

function pickColour() {
  let allowedColors = [
    { r: 255, g: 0, b: 0 },  // Red
    { r: 255, g: 255, b: 0 }, // Yellow
    { r: 0, g: 0, b: 255 },   // Blue
    { r: 255, g: 255, b: 255 }, // White
    { r: 0, g: 0, b: 0 } // Black
  ];
  return hl.randomElement(allowedColors);
}

function makeSquare(posX, posY, dim) {
  this.posX = posX;
  this.posY = posY;
  this.dim = dim;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  noFill();
  stroke(255);
  strokeWeight(4);

  constructRandomGrid();
}

function draw() {
  background(256);
  drawGrid();
}

function constructRandomGrid() {
  // size of the padding between grid and sketch borders
  padding = 0;

  // number of rows and columns of the grid (random value)
  gridDivs = hl.randomInt(1, 8);
  // actual spacing between grid points (adjusted to fill the canvas)
  gridSpacing = width / gridDivs;

  // here we populate the 2d boolean array
  bools = [];

  for (let x = 0; x < gridDivs; x++) {
    var column = [];
    for (let y = 0; y < gridDivs; y++) {
      column.push(1);
    }
    bools.push(column);
  }

  constructIrregularGrid([1, 2, 4]);
  constructIrregularGrid([2]);
  constructIrregularGrid([1]);
}

function constructIrregularGrid(sizesArr) {
  for (let x = 0; x < gridDivs - max(sizesArr) + 1; x++) {
    for (let y = 0; y < gridDivs - max(sizesArr) + 1; y++) {

      dim = hl.randomElement(sizesArr);

      fits = true;

      // check if within bounds
      if (x + dim > gridDivs || y + dim > gridDivs) {
        fits = false;
      }

      // check if square overlaps with any other square
      if (fits) {
        for (let xc = x; xc < x + dim; xc++) {
          for (let yc = y; yc < y + dim; yc++) {
            if (bools[xc][yc] == 0) {
              fits = false;
            }
          }
        }
      }

      if (fits) {
        // mark area as occupied
        for (let xc = x; xc < x + dim; xc++) {
          for (let yc = y; yc < y + dim; yc++) {
            bools[xc][yc] = false;
          }
        }

        squareInfo.push(new makeSquare(x, y, dim));
      }
    }
  }
}

function drawGrid() {
  for (let n = 0; n < squareInfo.length; n++) {
    s = squareInfo[n];
    
    let windowColour = pickColour();
    drawWindow(s.posX * gridSpacing + padding, s.posY * gridSpacing + padding, s.dim * gridSpacing, s.dim * gridSpacing, windowColour);
    
    // rect(s.posX * gridSpacing + padding, s.posY * gridSpacing + padding,
    //   s.dim * gridSpacing, s.dim * gridSpacing);
  }
}

function drawWindow(x, y, w, h, windowColour) {
  noStroke(); // No outline by default

  // Grey background
  fill(200);
  rect(x, y, w, h);
  
  // Blue bar
  fill(0, 0, 200);
  rect(x + 5, y + 5, w - 10, 20);

  // White window
  fill(windowColour.r, windowColour.g, windowColour.b); // alter this for colours
  rect(x + 5, y + 40, w - 10, h - 50);

  // Mini boxes on the right-hand side of the blue bar
  fill(200);
  rect((x+w)-65, y + 7, 15, 15);
  rect((x+w)-45, y + 7, 15, 15);
  rect((x+w)-25, y + 7, 15, 15);
  
  // Scroll bars
  // vertical
  fill(240);
  rect((x+w)-20, y+40, 15, h-70)
  
  // horizontal
  fill(240);
  rect(x+5, (y+h)-25, w-10, 15);
  
  // Square between scroll bars
  fill(210);
  rect((x+w)-20, (y+h)-25, 15, 15);
  
  // Buttons on scroll bars

  // vertical top
  fill (210, 210, 210)
  rect ((x+w)-20, y+40, 15, 15)

  // vertical bottom
  fill (210, 210, 210);
  rect ((x+w)-20, (y+h)-40, 15, 15);
  
  // horizontal left
  fill (210, 210, 210)
  rect (x+5, (y+h)-25, 15, 15)
  
  // horizontal right
  fill(210);
  rect((x+w)-35, (y+h)-25, 15, 15);
  
  // Outer rectangle outside shading
  stroke(240, 240, 240);
  strokeWeight(3);
  line(x + 1, y, x + w, y);
  
  stroke(150, 150, 150);
  strokeWeight(3);
  line(x + w, y, x + w, y + h - 2);
  
  stroke(150, 150, 150);
  strokeWeight(3);
  line(x + 2, y + h, x + w, y + h);
  
  // Shading around white rectangle
  stroke (100, 100, 100)
  strokeWeight (2)
  line (x + 5, y + 40, x + w - 6, y + 40)
  
  stroke(100, 100, 100);
  strokeWeight(2);
  line(x + 5, y + 40, x + 5, y + h - 10);

  // Scroll bar box shading - vertical top dark grey RHS
  stroke(100, 100, 100);
  strokeWeight(2);
  line(x + w - 6, y + 40, x + w - 6, y + 55);
  
  // Scroll bar box shading - vertical top white LHS
  stroke(250, 250, 250);
  strokeWeight(2);
  line(x + w - 19, y + 42, x + w - 19, y + 55);
  
  // Scroll bar box shading - vertical top white top
  stroke (250, 250, 250)
  strokeWeight (2)
  line (x + w - 19, y + 42, x + w - 6, y + 42)

  // Scroll bar box shading - vertical top dark grey bottom
  stroke (80, 80, 80)
  strokeWeight (2)
  line (x + w - 18, y + 55, x + w - 6, y + 55)

  // Scroll bar box shading - vertical bottom dark grey
  stroke (80, 80, 80)
  strokeWeight (2)
  line(x+w-19, y+h-25, x+w-6, y+h-25)
  
  // Scroll bar box shading - vertical bottom dark grey
  stroke (80, 80, 80)
  strokeWeight (2)
  line (x+w-6, y+h-25, x+w-6, y+h-37)

  // Scroll bar box shading - vertical bottom white top
  stroke (250, 250, 250)
  strokeWeight (2)
  line (x+w-19, y+h-39, x+w-6, y+h-39)
  
  // Scroll bar box shading - horizontal right dark grey right
  stroke (80, 80, 80)
  strokeWeight (2)
  line (x+w-20, y+h-23, x+w-20, y+h-11)

  // Scroll bar box shading - horizontal right white top
  stroke (250, 250, 250)
  strokeWeight (2)
  line (x+w-34, y+h-24, x+w-22, y+h-24)

  // Scroll bar box shading - horizontal left white top
  stroke (250, 250, 250)
  strokeWeight (2)
  line (x+7, y+h-24, x+19, y+h-24)

  // Scroll bar box shading - horizontal right dark grey bottom
  stroke (100, 100, 100)
  strokeWeight (2)
  line (x+w-34, y+h-11, x+w-20, y+h-11)

  // Scroll bar box shading - horizontal left dark grey bottom
  stroke (80, 80, 80)
  strokeWeight (2)
  line (x+5, y+h-11, x+19, y+h-11)

  // Scroll bar box shading - horizontal left dark grey right
  stroke (80, 80, 80)
  strokeWeight (2)
  line (x+20, y+h-10, x+20, y+h-23)
  
  // Minimise line
  stroke  (50, 50, 50)
  strokeWeight (2)
  line (x+w-62, y+20, x+w-53, y+20)
  
  // Full screen box bottom
  stroke  (50, 50, 50)
  strokeWeight (1)
  line (x+w-42, y+20, x+w-33, y+20)

  // Full screen box left
  stroke  (50, 50, 50)
  strokeWeight (1)
  line (x+w-42, y+10, x+w-42, y+20)
  
  // Full screen box right
  stroke  (50, 50, 50)
  strokeWeight (1)
  line (x+w-33, y+10, x+w-33, y+20)

  // Full screen box top
  stroke  (50, 50, 50)
  strokeWeight (2)
  line (x+w-42, y+10, x+w-33, y+10)

  // Close 1
  stroke (50, 50, 50)
  strokeWeight (2)
  line (x+w-21, y+11, x+w-14, y+18)
  
  // Close 2
  stroke (50, 50, 50)
  strokeWeight (2)
  line (x+w-14, y+11, x+w-21, y+18)
  
  // Scroll arrow horizontal right
  stroke (120, 120, 120)
  fill (120, 120, 120)
  triangle (x+10, y+h-17, x+15, y+h-19, x+15, y+h-15)
  
  // Scroll arrow horizontal right
  stroke (120, 120, 120)
  fill (120, 120, 120)
  triangle ((x+w)-25, y+h-17, (x+w)-30, y+h-19, (x+w)-30, y+h-15)

  // Scroll arrow vertical bottom
  stroke (120, 120, 120)
  fill (120, 120, 120)
  triangle (x+w-16, y+h-33, x+w-13, y+h-29, x+w-10, y+h-33)

  // Scroll arrow vertical top
  stroke (120, 120, 120)
  fill (120, 120, 120)
  triangle (x+w-16, y+51, x+w-13, y+47, x+w-10, y+51)

  // Line
  stroke (250, 250, 250)
  strokeWeight (2)
  line (x+5, y+h-9, x+w-5, y+h-9)

  // Line
  stroke (250, 250, 250)
  strokeWeight (2)
  line (x+w-4, y+h-9, x+w-4, y+40)


}