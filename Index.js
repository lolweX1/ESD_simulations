const sections = {
	"chemistry": document.getElementById("Chem")
	,"biology": document.getElementById("Bio")
	,"history": document.getElementById("History")
	,"physics": document.getElementById("Physics")
	,"home": document.getElementById("Home")
	,"cat": document.getElementById("Cat")
}

function showSection(sect) {
	for (i in Object.keys(sections)) {
		sections[Object.keys(sections)[i]].style.display = "None";
	}
	if (sect != "home") {
		//clearInterval(Hstart);
	} else {
		//Hstart = setInterval(HomeUpdate, HIntervalBreak);
	}
	if (sect == "cat") {
		animateCatCanvas();
	} else {
		cancelAnimationFrame(animateCatCanvas);
	}
	sections[sect].style.display = "block";
}

let joe = new simple_pendulum(5, 9.81, 15);
console.log(joe.calculateTime())