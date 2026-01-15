const cards = {
	"Gunpowder": "led to expansion of territory for land-based empires"
	,"Grand Canal": "promoted trade and population growth, connected the two largest waterways in china which allowed for trading food back and forth"
	,"Champa rice":"very sustainable, population boom in china"
	,"Civil service Exam": "china, meritocracy"
}

// add variables
let count = 0;

// flashCardWidthChange variables
let flashCardWidthMax = 50;
let flashCardWidthMin = 2;
let flashCardWidth = 50;
let shrink =true;
let cycle = false;

// swap variables
let s = true;

document.getElementById("historyFlash").addEventListener("dblclick", function (e) {
    e.preventDefault();
  });

// Functions
function flashUpdate() {
	document.getElementById("flashTerm").innerHTML = Object.keys(cards)[count];
	document.getElementById("flashText").innerHTML = cards[Object.keys(cards)[count]];
}
flashUpdate();

document.getElementById("historyFlash").style.width = flashCardWidthMax + "vw";
document.getElementById("historyFlash").style.left = 50 + "vw";

function next(c) {
	count += c;
	if (count >= Object.keys(cards).length) {
		count = 0;
	}
	if (count < 0) {
		count = Object.keys(cards).length-1;
	}
	if (!s) {
		swap(false);
	}
	flashUpdate();
}

function swap(flip=true) {
	if (flip) {
		document.getElementById("flashTerm").style.display = "none";
		document.getElementById("flashText").style.display = "none";
		flashCardWidthChange();
	} else {
		if (s) {
			document.getElementById("flashTerm").style.display = "none";
			document.getElementById("flashText").style.display = "inline-block";
		} else {
			document.getElementById("flashTerm").style.display = "inline-block";
			document.getElementById("flashText").style.display = "none";
		}
		s = !s;
	}
}

function flashCardWidthChange() {
	cycle = true;
	flashCardWidth += (shrink)? -1: 1;
	if (flashCardWidth <= flashCardWidthMin) {
		shrink = false;
	}
	else if (flashCardWidth >= flashCardWidthMax) {
		shrink = true;
		cycle = false;
	}
	document.getElementById("historyFlash").style.width = flashCardWidth + "vw";
	document.getElementById("historyFlash").style.left = 50 + "vw";
	if (cycle) {
		setTimeout(flashCardWidthChange, 2);
	} else {
		swap(false);
	}
}
