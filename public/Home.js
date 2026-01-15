/*const Hcanvas = document.getElementById("HStars");
const Hc = Hcanvas.getContext("2d");

//please note that this does not adapt to changes in the window, fix this when you can
Hcanvas.width = innerWidth;
Hcanvas.height = innerHeight*0.91;
Hcanvas.style.width = `${Hcanvas.width}px`;
Hcanvas.style.height = `${Hcanvas.height}px`;

let Hstart = null;

const Hstars = {
}

const HIntervalBreak = 100;

for (let i = 0; i < 50; i++) {
	let randRad = Math.random()*2;
	let randX = Math.floor(Math.random() * Hcanvas.width)
	let randY = Math.floor(Math.random() * Hcanvas.height);
	Hstars[String(i)] = [randRad, randX, randY];
}

function HomeUpdate() {
	Hc.clearRect(0, 0, Hcanvas.width, Hcanvas.height);
	Hc.fillStyle = "black";
	Hc.fillRect(0, 0, Hcanvas.width, Hcanvas.height);
	Hc.fillStyle = "white";
	for (let i = 0; i < 50; i++) {
		let offsetX = Math.random() * 0.2;
		let offsetY = Math.random() * 0.1;
		let neg = Math.floor(Math.random() * 4);
		Hstars[String(i)][1] += (neg == 1||neg==2)? -offsetX: offsetX;
		Hstars[String(i)][2] += (neg == 2||neg==3)? -offsetY: offsetY;
		if (Hstars[String(i)][1] < 0) Hstars[String(i)][1] = Hcanvas.width;
		if (Hstars[String(i)][2] < 0) Hstars[String(i)][2] = Hcanvas.height;
		
		if (Hstars[String(i)][1] > Hcanvas.width) Hstars[String(i)][1] = 0;
		if (Hstars[String(i)][2] > Hcanvas.height) Hstars[String(i)][2] = 0;
		
		Hc.beginPath()
		Hc.arc(Hstars[String(i)][1], Hstars[String(i)][2], Hstars[String(i)][0], 0, Math.PI*2);
		Hc.fill();
	}
}*/


/*async function getData() {
	try {
		const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=QGycgZ2AhFdLwWEVuGc5HVbPRjlfdGRF4f7PdbJl", {
			method: "GET"
		});

		const data = await response.json();
		document.getElementById("NasaAPOD").src = data["url"];
		document.getElementById("NasaAPODcredits").innerHTML = "\"" + data["title"] + "\"<br> by " + data["copyright"];
		setImage("NasaAPOD", "auto", "91vh")
	} catch (err) {
		console.log("unable  to fetch image");
	}
}

function setImage(id, width, height) {
	document.getElementById(id).style.width = width;
	document.getElementById(id).style.height = height;
}

getData();*/
