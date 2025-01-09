const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

let yellowBalls = 4;
let redBalls = 8;
let totalMoves = { 1: 0, 2: 0 };
let currentPlayer = parseInt(document.getElementById("firstPlayer").value);
const erorrMessage = document.getElementById("erorrMessage");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const result = document.getElementById("result");

drawTree();

function startGame() {
  yellowBalls = parseInt(document.getElementById("yellowBalls").value);
  redBalls = parseInt(document.getElementById("redBalls").value);

  result.innerText = "";
  resetButton.style.display = "none";

  context.clearRect(0, 0, canvas.width, canvas.height);

  drawTree();
  drawBaubles();

  takeBalls();
}

function takeBalls() {
  const takenYellow = parseInt(document.getElementById("yellowBalls").value);
  const takenRed = parseInt(document.getElementById("redBalls").value);

  if (takenYellow === 0 && takenRed === 0) {
    erorrMessage.style.display = "block";
    // alert("Take the balls!");
    return;
  }

  erorrMessage.style.display = "none";

  yellowBalls -= takenYellow;
  redBalls -= takenRed;

  totalMoves[currentPlayer] += takenYellow + takenRed;

  currentPlayer = currentPlayer === 1 ? 2 : 1;

  drawBaubles();

  if (yellowBalls === 0 && redBalls === 0) {
    getWinner();
  }
}

function getWinner() {
  setTimeout(() => {
    let resultText;
    console.log(totalMoves[1], totalMoves[2]);
    if (totalMoves[1] > totalMoves[2]) {
      resultText = "Pantelei winner";
    } else if (totalMoves[2] > totalMoves[1]) {
      resultText = "Kornei winner";
    } else {
      resultText = "Friendship wins!";
    }

    result.innerText = resultText;
    resetButton.style.display = "block";
  }, 100);
}

function resetGame() {
  document.getElementById("yellowBalls").value = 0;
  document.getElementById("redBalls").value = 0;
  yellowBalls = null;
  redBalls = null;
  totalMoves = { 1: 0, 2: 0 };
  currentPlayer = null;

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawTree();

  result.innerText = "";
  resetButton.style.display = "none";
}

function drawTree() {
  context.fillStyle = "green";

  context.beginPath();
  context.moveTo(200, 100);
  context.lineTo(100, 300);
  context.lineTo(300, 300);
  context.closePath();
  context.fill();

  context.beginPath();
  context.moveTo(200, 150);
  context.lineTo(50, 400);
  context.lineTo(350, 400);
  context.closePath();
  context.fill();

  context.fillStyle = "saddlebrown";
  context.fillRect(180, 400, 40, 100);

  drawStar(200, 100, 7, 9, 10);
}

function drawStar(x, y, r, n, inset) {
  context.save();
  context.beginPath();
  context.translate(x, y);
  // context.moveTo(0, 0 - r);
  for (let i = 0; i < n; i++) {
    context.rotate(Math.PI / n);
    context.lineTo(0, 0 - r * inset);
    context.rotate(Math.PI / n);
    context.lineTo(0, 0 - r);
  }
  // context.closePath();
  context.fillStyle = "gold";
  context.fill();
  context.restore();
}

function drawBaubles() {
  const baubleRadius = 10;
  const baublePositions = [
    [160, 360],
    [280, 320],
    [160, 210],
    [180, 240],
    [160, 250],
    [180, 320],
    [220, 300],
    [240, 340],
    [220, 170],
    [140, 270],
    [120, 360],
    [140, 320],
  ];

  let yellowBaublesCount = parseInt(
    document.getElementById("yellowBalls").value
  );
  let redBaublesCount = parseInt(document.getElementById("redBalls").value);

  for (let i = 0; i < yellowBaublesCount && i < baublePositions.length; i++) {
    context.fillStyle = "yellow";
    context.beginPath();
    context.arc(
      baublePositions[i][0],
      baublePositions[i][1],
      baubleRadius,
      0,
      Math.PI * 2
    );
    context.fill();
  }

  for (let i = 0; i < redBaublesCount && i < baublePositions.length; i++) {
    context.fillStyle = "red";
    context.beginPath();
    context.arc(
      baublePositions[i + yellowBaublesCount][0],
      baublePositions[i + yellowBaublesCount][1],
      baubleRadius,
      0,
      Math.PI * 2
    );
    context.fill();
  }
}

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
