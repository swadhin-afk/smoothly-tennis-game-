const canvas = document.getElementById("tennisball");
const context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 10;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let playerScore = 0;
let aiScore = 0;

function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#fff";
    context.fillRect(20, playerY, paddleWidth, paddleHeight);

    context.fillRect(canvas.width - 30, aiY, paddleWidth, paddleHeight);

    context.beginPath();
    context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    context.fillStyle = "#fff";
    context.fill();

    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    for (let i = 0; i < canvas.height; i += 20) {
        context.beginPath();
        context.moveTo(canvas.width / 2, i);
        context.lineTo(canvas.width / 2, i + 10);
        context.stroke();
    }

    context.font = "30px Arial";
    context.fillText(playerScore, canvas.width / 4, 50);
    context.fillText(aiScore, (canvas.width * 3) / 4, 50);
}

function moveGame() {

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    
    if (ballY <= 0 || ballY >= canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }


    if (
        ballX <= 30 &&
        ballY >= playerY &&
        ballY <= playerY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }
    
    else if (
        ballX >= canvas.width - 30 &&
        ballY >= aiY &&
        ballY <= aiY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    
    if (ballX <= 0) {
        aiScore++;
        resetBall();
    } else if (ballX >= canvas.width) {
        playerScore++;
        resetBall();
    }

    
    if (ballY > aiY + paddleHeight / 2) {
        aiY += 3;
    } else {
        aiY -= 3;
    }
}


function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    playerY = event.clientY - rect.top - paddleHeight / 2;


    if (playerY < 0) playerY = 0;
    if (playerY > canvas.height - paddleHeight) playerY = canvas.height - paddleHeight;
});


function gameLoop() {
    moveGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();