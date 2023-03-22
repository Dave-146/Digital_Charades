const canvas = document.getElementById("spinner");
const context = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 120;
const sliceCount = 8;
const sliceSize = (Math.PI * 2) / sliceCount;
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "brown",
  "black"
];

function drawSlice(angle, color) {
  context.beginPath();
  context.fillStyle = color;
  context.moveTo(centerX, centerY);
  context.arc(centerX, centerY, radius, angle, angle + sliceSize);
  context.lineTo(centerX, centerY);
  context.fill();
}

function drawSpinner() {
  let angle = 0;
  for (let i = 0; i < sliceCount; i++) {
    const color = colors[i];
    drawSlice(angle, color);
    angle += sliceSize;
  }
}

function spin() {
  const min = 5;
  const max = 15;
  const spins = Math.floor(Math.random() * (max - min + 1)) + min;
  const duration = 3000;
  const anglePerSpin = Math.PI / sliceCount * 2;
  const targetAngle = anglePerSpin * spins;
  let currentAngle = 0;
  const spinInterval = setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSpinner();
    context.save();
    context.translate(centerX, centerY);
    context.rotate(currentAngle);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(radius + 20, 0);
    context.lineWidth = 5;
    context.strokeStyle = "white";
    context.stroke();
    context.restore();
    currentAngle += anglePerSpin;
    if (currentAngle >= targetAngle) {
      clearInterval(spinInterval);
    }
  }, 16);
}

drawSpinner();
const spinButton = document.getElementById("spinButton");
spinButton.addEventListener("click", spin);