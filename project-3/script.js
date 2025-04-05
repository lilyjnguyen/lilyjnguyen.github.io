//const drawingCanvas = document.getElementById('drawingCanvas');
const reflectionCanvas = document.getElementById('reflectionCanvas');

const canvasWidth = window.innerWidth * 0.4;
const canvasHeight = window.innerHeight * 0.8;
drawingCanvas.width = canvasWidth;
drawingCanvas.height = canvasHeight;
reflectionCanvas.width = canvasWidth;
reflectionCanvas.height = canvasHeight;

const drawingContext = drawingCanvas.getContext('2d');
const reflectionContext = reflectionCanvas.getContext('2d');

let drawing = false;

drawingCanvas.addEventListener('mousedown', (e) => {
    drawing = true;
    draw(e);
  });

  drawingCanvas.addEventListener('mouseup', () => {
    drawing = false;
});

    drawingCanvas.addEventListener('mousemove', (e) => {
        if (drawing) {
          draw(e);
        }
      });

  drawingContext.strokeStyle = '#FFFFFF'; 
  drawingContext.lineWidth = 5;
  drawingContext.lineCap = 'round';

  drawingContext.lineTo(x, y);
  drawingContext.stroke();
  drawingContext.beginPath();
  drawingContext.moveTo(x, y);

// REFLECT
  reflectionContext.clearRect(0, 0, reflectionCanvas.width, reflectionCanvas.height);
  reflectionContext.drawImage(drawingCanvas, 0, 0);

  
  const invertButton = document.getElementById('invertButton');
  let isInverted = false;
  
  invertButton.addEventListener('click', () => {
      isInverted = !isInverted; // Toggle the state
      document.body.style.filter = isInverted ? 'invert(1)' : 'invert(0)';
  });