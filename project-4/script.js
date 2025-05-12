
let strawberryPixels = [];
let particles = [];
let pixelSize = 8;
let totalTime = 180;
let startTime;
let running = false;
let showMenu = true;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('myCanvas'); 
  noStroke();
  textFont('Courier New');
  textSize(10);
}

function draw() {
  if (showMenu) {
    drawMenu();
    return;
  }

  background(10, 20, 50); 

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
      let fresh = color(255, 0, 0);  //red   
      let moldy = color(40, 80, 40);    //green
      let rotten = color(50, 30, 10);   //brown

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
        color: color(255, 0, 0), 
        visible: true,
        noiseValue: noiseVal
      });
    }
  }
}

function drawCountdownMessage(elapsed) {
  let remaining = totalTime - elapsed;
  if (remaining <= 10 && remaining > 0) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(64);
    text(floor(remaining), width / 2, height / 2);
  }

 if (remaining <= 0) {
  if (running) running = false; 
  fill(255);
  textSize(28);
  textAlign(CENTER, CENTER);
  text("Full decay has been completed.", width / 2, height / 2 + 80);
}
}

function drawMenu() {
  background(10, 20, 50);
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
  text("CHOOSE A DECAY DURATION", width / 2, height / 2 - 100);

  drawButton("1 MINUTE", width / 2, height / 2 - 30, () => startTimer(60));
  drawButton("3 MINUTES", width / 2, height / 2 + 30, () => startTimer(180));
  drawButton("5 MINUTES", width / 2, height / 2 + 90, () => startTimer(300));
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