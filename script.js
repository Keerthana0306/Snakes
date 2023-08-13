var blockSize = 20;
var total_row = 16; 
var total_col = 16; 
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var speedX = 0; 
var speedY = 0; 

var snakeBody = [];

var squareX;
var squareY;

var gameOver = false;

window.onload = function () {
	board = document.getElementById("board");
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context = board.getContext("2d");

	placeSquare();
	document.addEventListener("keyup", changeDirection);
	setInterval(update, 1000 / 10);
}

function update() {
	if (gameOver) {
		return;
	}
	context.fillStyle = "white";
	context.fillRect(0, 0, board.width, board.height);
	context.fillStyle = "black";
	context.fillRect(squareX, squareY, blockSize, blockSize);

	if (snakeX == squareX && snakeY == squareY) {
		snakeBody.push([squareX, squareY]);
		placeSquare();
	}

	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

	context.fillStyle = "green";
	snakeX += speedX * blockSize; 
	snakeY += speedY * blockSize; 
	context.fillRect(snakeX, snakeY, blockSize, blockSize);
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
	}

	if (snakeX < 0
		|| snakeX > total_col * blockSize
		|| snakeY < 0
		|| snakeY > total_row * blockSize) {
		gameOver = true;
		alert("Game Over");
	}

	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
			gameOver = true;
			alert("Game Over");
		}
	}
}
function changeDirection(e) {
	if (e.code == "ArrowUp" && speedY != 1) {
		speedX = 0;
		speedY = -1;
	}
	else if (e.code == "ArrowDown" && speedY != -1) {
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "ArrowLeft" && speedX != 1) {
		speedX = -1;
		speedY = 0;
	}
	else if (e.code == "ArrowRight" && speedX != -1) {
		speedX = 1;
		speedY = 0;
	}
}
function placeSquare() {
	squareX = Math.floor(Math.random() * total_col) * blockSize;
	squareY = Math.floor(Math.random() * total_row) * blockSize;
}
