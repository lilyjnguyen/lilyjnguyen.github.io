function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(220);
    angleMode(DEGREES);
  }
  
  function draw() {
    
    noStroke();
    if (mouseIsPressed) {
      fill(0);
    } else {
      noFill();
    }
    
    ellipse(mouseX, mouseY, (90, 200), 20);

    ellipse(mouseX, mouseY, 90, 20);
    

    ellipse(mouseX + 500, mouseY, 90, 20);
  }