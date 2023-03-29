/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: "dancing 1" },
  { minDegree: 31, maxDegree: 60, value: "dancing 2" },
  { minDegree: 0, maxDegree: 30, value: "dancing 3" },
  { minDegree: 331, maxDegree: 360, value: "dancing 4" },
  { minDegree: 301, maxDegree: 330, value: "dancing 5" },
  { minDegree: 271, maxDegree: 300, value: "dancing 6" },
  { minDegree: 241, maxDegree: 270, value: "dancing 7" },
  { minDegree: 211, maxDegree: 240, value: "dancing 8" },
  { minDegree: 181, maxDegree: 210, value: "dancing 9" },
  { minDegree: 151, maxDegree: 180, value: "dancing 10" },
  { minDegree: 121, maxDegree: 150, value: "dancing 11" },
  { minDegree: 91, maxDegree: 120, value: "dancing 12" },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#ED7657",
  "#61C9C8",
  "#F7E0B2",
  "#ED7657",
  "#61C9C8",
  "#F7E0B2",
  "#ED7657",
  "#61C9C8",
  "#F7E0B2",
  "#ED7657",
  "#61C9C8",
  "#F7E0B2",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Act as a ${i.value} ! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Lets get ready to Mime</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */