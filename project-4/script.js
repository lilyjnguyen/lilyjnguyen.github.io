
// let pixelSize = 18;
// let strawberryPixels = [];
// let particles = [];
// let startTime;
// let totalTime = 180; // seconds

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   noSmooth();
//   frameRate(30);
//   startTime = millis();
//   noiseDetail(3, 0.5);
//   initStrawberry();
//   textFont('Georgia');
// }

// function draw() {
//   background(10, 20, 50); // Dark blue background

//   let elapsed = floor((millis() - startTime) / 1000); // Seconds
//   let decayAmount = 0;

//   // Start decay at 0 seconds, end by 180 seconds
//   if (elapsed >= 0 && elapsed <= totalTime) {
//     decayAmount = map(elapsed, 0, totalTime, 0, 1);
//   } else if (elapsed > totalTime) {
//     decayAmount = 1;
//   }

//   // Process pixels and transition color based on decayAmount
//   for (let i = strawberryPixels.length - 1; i >= 0; i--) {
//     let p = strawberryPixels[i];
//     if (!p.visible) continue;

//     let threshold = p.noiseValue;

//     if (decayAmount > threshold) {
//       let age = map(decayAmount - threshold, 0, 1 - threshold, 0, 1);
//       let fresh = color(255, 0, 0);        // Red
//       let moldy = color(40, 80, 40);       // Green
//       let rotten = color(50, 30, 10);      // Brown

//       let intermediate = lerpColor(fresh, moldy, constrain(age * 2, 0, 1));
//       p.color = lerpColor(intermediate, rotten, constrain((age - 0.5) * 2, 0, 1));

//       if (age > 1) {
//         p.visible = false;
//         particles.push(new Particle(p.x, p.y, p.color));
//       }
//     }

//     if (p.visible) {
//       fill(p.color);
//       noStroke();
//       rect(p.x, p.y, pixelSize, pixelSize);
//     }
//   }

//   // Update and display particles
//   for (let i = particles.length - 1; i >= 0; i--) {
//     let part = particles[i];
//     part.update();
//     part.display();
//     if (part.isDead()) particles.splice(i, 1);
//   }

//   drawCountdownMessage(elapsed);
// }

// function drawCountdownMessage(elapsed) {
//     let remaining = max(0, totalTime - elapsed);
//     let minutes = floor(remaining / 60);
//     let seconds = nf(remaining % 60, 2);
  
//     let msg = `Everything rots eventually. Slowly, quietly. 
//   While there is no escape from it, we can find beauty and solace in the inevitable.
  
//   Look, this strawberry only has ${minutes}:${seconds} minutes left.`;
  
//     fill(255);
//     textAlign(CENTER, TOP);
//     textSize(18);
//     textWrap(WORD);
  
//     // Center under the strawberry
//     let textX = width / 2;
//     let textY = height / 2 + 140; // below the strawberry
//     let textBoxWidth = 400;
  
//     text(msg, textX, textY, textBoxWidth);
//   }

// function initStrawberry() {
//   strawberryPixels = [];
//   particles = [];

//   const centerX = width / 2;
//   const centerY = height / 2;

//   const shape = [
//     ".....RRRRR.....",
//     "...RRRRRRRRR...",
//     "..RRRRRRRRRRR..",
//     ".RRRRRRRRRRRRR.",
//     ".RRRRRRRRRRRRR.",
//     ".RRRRRRRRRRRRR.",
//     "..RRRRRRRRRRR..",
//     "..RRRRRRRRRRR..",
//     "...RRRRRRRRR...",
//     "....RRRRRRR....",
//     ".....RRRRR.....",
//     "......RRR......",
//     "......RRR......",
//     ".......R......."
//   ];

//   const rows = shape.length;
//   const cols = shape[0].length;
//   const offsetX = centerX - (cols / 2) * pixelSize;
//   const offsetY = centerY - (rows / 2) * pixelSize;

//   for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//       let char = shape[y][x];
//       if (char === "R") {
//         let px = offsetX + x * pixelSize;
//         let py = offsetY + y * pixelSize;

//         strawberryPixels.push({
//           x: px,
//           y: py,
//           color: color(255, 0, 0), // Red
//           visible: true,
//           noiseValue: noise(px * 0.01, py * 0.01)
//         });
//       }
//     }
//   }

//   // Optional green leaf
//   const leafY = offsetY - pixelSize;
//   const leafX = centerX;
//   strawberryPixels.push({
//     x: leafX,
//     y: leafY,
//     color: color(0, 180, 0),
//     visible: true,
//     noiseValue: noise(leafX * 0.01, leafY * 0.01)
//   });
// }

// // Particle class
// class Particle {
//   constructor(x, y, c) {
//     this.pos = createVector(x, y);
//     this.vel = createVector(random(-1, 1), random(-2, -0.5));
//     this.acc = createVector(0, 0.05);
//     this.color = c;
//     this.alpha = 255;
//   }

//   update() {
//     this.vel.add(this.acc);
//     this.pos.add(this.vel);
//     this.alpha -= 2;
//   }

//   display() {
//     fill(red(this.color), green(this.color), blue(this.color), this.alpha);
//     noStroke();
//     rect(this.pos.x, this.pos.y, pixelSize, pixelSize);
//   }

//   isDead() {
//     return this.alpha <= 0;
//   }
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   initStrawberry();
//   startTime = millis();
// }

let strawberryPixels = [];
let particles = [];
let pixelSize = 8;
let totalTime = 180;
let startTime;
let running = false;
let showMenu = true;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('myCanvas'); // Assign an ID to the canvas
  noStroke();
  textFont('Courier New');
  textSize(12);
}

function draw() {
  if (showMenu) {
    drawMenu();
    return;
  }

  background(10, 20, 50); // Dark blue background

  let elapsed = floor((millis() - startTime) / 1000);
  let decayAmount = 0;

  if (elapsed >= 0 && elapsed <= totalTime) {
    decayAmount = map(elapsed, 0, totalTime, 0, 1);
  } else if (elapsed > totalTime) {
    decayAmount = 1;
  }

  for (let i = strawberryPixels.length - 1; i >= 0; i--) {
    let p = strawberryPixels[i];
    if (!p.visible) continue;

    let threshold = p.noiseValue;

    if (decayAmount > threshold) {
      let age = map(decayAmount - threshold, 0, 1 - threshold, 0, 1);
      let fresh = color(255, 0, 0);      // Red
      let moldy = color(40, 80, 40);     // Green
      let rotten = color(50, 30, 10);    // Brown

      let intermediate = lerpColor(fresh, moldy, constrain(age * 2, 0, 1));
      p.color = lerpColor(intermediate, rotten, constrain((age - 0.5) * 2, 0, 1));

      if (age > 1) {
        p.visible = false;
        particles.push(new Particle(p.x, p.y, p.color));
      }
    }

    if (p.visible) {
      fill(p.color);
      rect(p.x, p.y, pixelSize, pixelSize);
    }
  }

  // Update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let part = particles[i];
    part.update();
    part.display();
    if (part.isDead()) particles.splice(i, 1);
  }

  drawCountdownMessage(elapsed);
}

function startTimer(seconds) {
  totalTime = seconds;
  startTime = millis();
  running = true;
  showMenu = false;
  initPixels();
}

function initPixels() {
  strawberryPixels = [];
  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      let noiseVal = noise(x * 0.01, y * 0.01);
      strawberryPixels.push({
        x,
        y,
        color: color(255, 0, 0), // Start fresh
        visible: true,
        noiseValue: noiseVal
      });
    }
  }
}

function drawCountdownMessage(elapsed) {
  let remaining = totalTime - elapsed;
  if (remaining <= 10 && remaining > 0) {
    fill(255, 80, 80);
    textAlign(CENTER, CENTER);
    textSize(64);
    text(floor(remaining), width / 2, height / 2);
  }

 if (remaining <= 0) {
  if (running) running = false; // Only turn off running once
  fill(255);
  textSize(28);
  textAlign(CENTER, CENTER);
  text("The decay has been completed.", width / 2, height / 2 + 80);
}
}

function drawMenu() {
  background(10, 20, 50);
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
  text("CHOOSE A DECAY DURATION", width / 2, height / 2 - 100);

  drawButton("1 Minute", width / 2, height / 2 - 30, () => startTimer(60));
  drawButton("3 Minutes", width / 2, height / 2 + 30, () => startTimer(180));
  drawButton("5 Minutes", width / 2, height / 2 + 90, () => startTimer(300));
}

function drawButton(label, x, y, callback) {
  let w = 200;
  let h = 40;
  fill(30);
  stroke(255);
  rectMode(CENTER);
  rect(x, y, w, h, 8);
  noStroke();
  fill(255);
  text(label, x, y);

  if (mouseIsPressed && mouseX > x - w / 2 && mouseX < x + w / 2 &&
      mouseY > y - h / 2 && mouseY < y + h / 2) {
    callback();
  }
}

class Particle {
  constructor(x, y, c) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.5, 2));
    this.lifespan = 255;
    this.color = c;
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan -= 3;
  }

  display() {
    fill(red(this.color), green(this.color), blue(this.color), this.lifespan);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (!showMenu) initPixels();
}