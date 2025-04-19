let colorPicker;
let weightSlider;
let sprayDensitySlider;
let brushSelector;
let clearButton;
let invertButton;
let weightLabel;
let sprayDensityLabel;
let brushModeLabel;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);


  stroke(255);
  line(width / 2, 0, width / 2, height);

  const leftOffset = 20;
  const verticalOffset = height / 2;


  colorPicker = createColorPicker('#ffffff');
  colorPicker.position(leftOffset, verticalOffset-170);

  // Brush size
  weightLabel = createDiv('BRUSH SIZE');
  weightLabel.position(leftOffset, verticalOffset - 100);
  weightLabel.style('color', 'white');
  weightLabel.style('font-family', 'Helvetica');
  weightLabel.style('font-size', '10px');

  weightSlider = createSlider(5, 100, 30);
  weightSlider.position(leftOffset, verticalOffset - 80);


  // Spray Density
  sprayDensityLabel = createDiv('SPRAY DENSITY');
  sprayDensityLabel.position(leftOffset, verticalOffset - 10);
  sprayDensityLabel.style('color', 'white');
  sprayDensityLabel.style('font-family', 'Helvetica');
  sprayDensityLabel.style('font-size', '10px');

  sprayDensitySlider = createSlider(10, 200, 50);
  sprayDensitySlider.position(leftOffset, verticalOffset + 10);

  

  // Brushes
  brushModeLabel = createDiv('BRUSH MODE');
  brushModeLabel.position(leftOffset, verticalOffset + 70);
  brushModeLabel.style('color', 'white');
  brushModeLabel.style('font-family', 'Helvetica');
  brushModeLabel.style('font-size', '10px');

  brushSelector = createSelect();
  brushSelector.option('Oval');
  brushSelector.option('Spray');
  brushSelector.selected('Oval');
  brushSelector.position(leftOffset, verticalOffset + 90);


  // Clear Button
  clearButton = createButton('CLEAR CANVAS');
  clearButton.style('background-color', '#000');
  clearButton.style('color', 'white');
  clearButton.style('padding', '10px 15px');
  clearButton.style('border', '1px solid white');   
  clearButton.style('border-radius', '5px');
  positionClearButton();

  clearButton.mousePressed(() => {
    background(0);
    stroke(255);
    line(width / 2, 0, width / 2, height);
  });


  // Invert Button
  invertButton = createButton('INVERT COLORS');
invertButton.style('position', 'absolute');
invertButton.style('top', '20px');
invertButton.style('right', '20px');
invertButton.style('background-color', '#000000'); 
invertButton.style('color', 'white');              
invertButton.style('padding', '10px 15px');
invertButton.style('border', '1px solid white');   
invertButton.style('border-radius', '5px');

  invertButton.mousePressed(() => {
    document.body.classList.toggle('inverted');
  });



  const css = `.inverted { filter: invert(1) hue-rotate(180deg); }`;
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
}

function draw() {
  if (mouseIsPressed && mouseX < width / 2) {
    let brush = brushSelector.value();
    let brushSize = weightSlider.value();
    fill(colorPicker.color());

    if (brush === 'Oval') {
      noStroke();
      let w = brushSize;
      let h = w / 3;

      ellipse(mouseX, mouseY, w, h);
      ellipse(width - mouseX, mouseY, w, h);
    } else if (brush === 'Spray') {
      let density = sprayDensitySlider.value();
      for (let i = 0; i < density; i++) {
        let angle = random(TWO_PI);
        let r = random(brushSize);
        let xOffset = r * cos(angle);
        let yOffset = r * sin(angle);

        let x = mouseX + xOffset;
        let y = mouseY + yOffset;

        ellipse(x, y, 1, 1);
        ellipse(width - x, y, 1, 1);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  line(width / 2, 0, width / 2, height);
  positionClearButton();
}

function positionClearButton() {
  if (clearButton) {
    clearButton.position((windowWidth - clearButton.width) / 2 - 30, windowHeight - 40);
  }
}