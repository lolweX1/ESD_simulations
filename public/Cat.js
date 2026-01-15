const catcanv = document.getElementById("CatCanvas");
const ccat = catcanv.getContext("2d");

const catwidth = innerWidth;
const catheight = innerHeight * 0.9;

catcanv.style.width = catwidth + "px";
catcanv.style.height = catheight + "px";

catcanv.width = catwidth;
catcanv.height = catheight;
const images = {};
const imageSources = [
    "cat_face_1.png",
    "cat_face_2.png",
    "cat_face_3.png",
    "cat_face_outside.png"
];

imageSources.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        images[src] = img;
    };
});

var face_emotion = 0;
var mouseX = 0;
var mouseY = 0;
var mouseInCanv = false;
var petting = false;
var mouseDown = false;

function animateCatCanvas() {
    ccat.clearRect(0, 0, catwidth, catheight);

    catcanv.onmouseenter = function() {
        mouseInCanv = true;
    };

    catcanv.onmouseleave = function() {
        mouseInCanv = false;
    };

    if (petting) {
        face_emotion = 2
    } else if (!mouseInCanv) {
        face_emotion = 1
    } else {
        face_emotion = 0
    }

    // Draw the outside face in the center
    const outsideImg = images[imageSources[3]];
    const facePosX = catwidth/2-outsideImg.width/2;
    const facePosY = catheight/2-outsideImg.height/2;
    ccat.drawImage(outsideImg, facePosX, facePosY);

    // Check if mouse is over the cat face
    const isMouseOverCat =
        mouseX >= facePosX &&
        mouseX <= facePosX + outsideImg.width &&
        mouseY >= facePosY &&
        mouseY <= facePosY + outsideImg.height;


    catcanv.onmousedown = function(e) {
        mouseDown = true;
    };

    if (mouseDown && isMouseOverCat) {
            petting = true;
    } else if (mouseDown && !isMouseOverCat) {
        petting = false;
    }

    catcanv.onmouseup = function(e) {
        mouseDown = false;
        petting = false
    };

    catcanv.onmousemove = function(e) {
        const rect = catcanv.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    };

    var mouseXRel = (mouseX-width/2)/width/2;
    var mouseYRel = (mouseY-height/2)/height/2;

    var faceImg = images[imageSources[face_emotion]];

    var face_min_x_pos = faceImg.width/2.2;
    var face_max_x_pos = faceImg.width/0.85;
    var face_min_y_pos = faceImg.height/2.2;
    var face_max_y_pos = faceImg.height/0.4;
    var eyesX = faceImg.width/1.35
    var eyesY = faceImg.height/0.7
    if (mouseXRel < 0) {
        eyesX += mouseXRel * (Math.abs(face_min_x_pos - eyesX));
    } else {
        eyesX += mouseXRel * (Math.abs(face_max_x_pos - eyesX));
    }
    if (mouseYRel < 0) {
        eyesY += mouseYRel * (Math.abs(face_min_y_pos - eyesY));
    } else {
        eyesY += mouseYRel * (Math.abs(face_max_y_pos - eyesY));
    }
    //faceImg.width/1.35, faceImg.height/0.7 is center
    ccat.drawImage(faceImg, facePosX + eyesX, facePosY + eyesY);

    requestAnimationFrame(animateCatCanvas);
}
