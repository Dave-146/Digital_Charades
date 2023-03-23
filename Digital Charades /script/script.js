const wheel = document.querySelector('.wheel');
const button = document.querySelector('.random_button');
const topics = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5', 'Topic 6', 'Topic 7', 'Topic 8'];
let angle = 0;

function spinWheel() {
  // Generate a random number between 0 and 7
  const randomIndex = Math.floor(Math.random() * topics.length);
  // Calculate the angle to rotate the wheel
  angle = 360 / topics.length * randomIndex + 360 * 5;
  // Rotate the wheel using CSS transform property
  wheel.style.transform = `rotate(${angle}deg)`;
}