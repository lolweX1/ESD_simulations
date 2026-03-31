const canv = document.getElementById("BallBoing");
const c = canv.getContext("2d");
const scale = window.devicePixelRatio;


const width = 600;
const height = 400;

canv.style.width = width + "px";
canv.style.height = height + "px";

canv.width = width;
canv.height = height;

let end = false;

const ballVelo = {
	"x": 0
	,"y": 0
}
const ballPos = {
	"x": 150
	,"y": 150
}
const ballRadius = 15;
const ballElasticity = 0.7;
const gravity = 0.98;

let windSpeed = 0;

function drawCircle(x, y, radius, color) {
	c.beginPath();
	c.arc(x, y, radius, 0, 2 * Math.PI);
	c.fillStyle = color;
	c.fill();
}

function update() {
	c.fillStyle = "black";
	c.fillRect(0, 0, canv.width, canv.height);
	c.fillStyle="white";
	c.font = "10px serif";
	c.fillText("X-velocity: " + ballVelo.x.toFixed(2), 0, 10);
	c.fillText("Y-velocity: " + (ballVelo.y*-1).toFixed(2), 0, 20);
	c.fillText("Ball position: (" + ballPos.x.toFixed(2) + ", " + (-1*ballPos.y).toFixed(2) + ")", 0, 30);
	c.fillText("Wind speed: " + windSpeed.toFixed(3), 100, 10);
	
	drawCircle(ballPos.x, ballPos.y, ballRadius, "white");
	
	ballVelo.y += gravity;
	ballVelo.x += windSpeed;
	
	if (ballPos.y+ballVelo.y > canv.height - ballRadius) {
		ballPos.y = canv.height - ballRadius;
		ballVelo.y *= -ballElasticity;

		if (Math.abs(ballVelo.y) < gravity*1.6) {
			ballVelo.y = 0;
		}
	}
	
	
	ballPos.x += ballVelo.x;
	ballPos.y += ballVelo.y;
	
	if (!end) {
		requestAnimationFrame(update);
	}
} 
requestAnimationFrame(update);

function resetBallBounce() {
	ballPos.y = 150;
}

function changeWindSpeed(delta) {
	windSpeed += delta;
}

function resetBall() {
	ballVelo.x = 0;
	ballVelo.y = 0;
	ballPos.x = 150;
	ballPos.y = 150;
}

function stop() {
	ballVelo.x = 0;
	ballVelo.y = 0;
}
