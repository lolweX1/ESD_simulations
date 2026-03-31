// --- Canvas setup ---
const MBMcanvas = document.getElementById("MaxwellBoltzMannDist");
const MBMc = MBMcanvas.getContext("2d");

const histCanvas = document.getElementById("SpeedHistogram");
const histCtx = histCanvas.getContext("2d");

// --- Responsive sizes ---
function setCanvasSizes() {
    const simWidth = innerWidth * 0.35;
    const simHeight = innerHeight * 0.45;

    MBMcanvas.width = simWidth;
    MBMcanvas.height = simHeight;

    const graphWidth = simWidth * 1.5;
    const graphHeight = simHeight;

    histCanvas.width = graphWidth;
    histCanvas.height = graphHeight;

    return { simWidth, simHeight, graphWidth, graphHeight };
}

let { simWidth, simHeight, graphWidth, graphHeight } = setCanvasSizes();

// --- Controls ---
const tempS = document.getElementById("tempSlider");
const tempO = document.getElementById("tempValue");
const partS = document.getElementById("partSlider");
const partO = document.getElementById("partValue");

// --- Simulation variables ---
let particles = [];
let particle_count = Number(partS.value);
let particle_size = 10;
let particle_speed_count = {}

// --- Constants ---
let kB = 1;
let m = 1;

// --- Maxwell-Boltzmann probability function ---
function MB_prob(v, T) {
    return (m / (kB * T)) * v * Math.exp(- (m * v * v) / (2 * kB * T));
}

// --- Probability array for sampling ---
let probArray = [];

function updateProbArray(T, bins = 500, vMax = 25) {
    probArray = [];
    let cumulative = 0;
    let step = vMax / bins;

    for (let i = 0; i <= bins; i++) {
        let v = i * step;
        let p = MB_prob(v, T);
        cumulative += p;
        probArray.push({v: v, c: cumulative});
    }

    for (let i = 0; i < probArray.length; i++) {
        probArray[i].c /= cumulative;
    }
}

function sampleSpeed() {
    let r = Math.random();
    for (let i = 0; i < probArray.length; i++) {
        if (r <= probArray[i].c) {
            return Math.round(probArray[i].v); // round to nearest integer
        }
    }
    // fallback
    return Math.round(probArray[probArray.length - 1].v);
}

// --- Add particles ---
function add_particles() {
    let angle = Math.random() * 2 * Math.PI;
    let x = Math.random() * (simWidth - particle_size);
    let y = Math.random() * (simHeight - particle_size);
    let speed = sampleSpeed();

    let t = speed / 25;
    if (t > 1) t = 1;
    let r = Math.floor(255 * t);
    let g = 0;
    let b = Math.floor(255 * (1 - t));

    particles.push([[x, y], speed, angle, `rgb(${r},${g},${b})`]);
}

// --- Update particle speeds ---
function updateParticleSpeeds(T) {
    for (let i = 0; i < particles.length; i++) {
        let speed = sampleSpeed();
        particles[i][1] = speed;
        let t = speed / 25;
        if (t > 1) t = 1;
        let r = Math.floor(255 * t);
        let g = 0;
        let b = Math.floor(255 * (1 - t));
        particles[i][3] = `rgb(${r},${g},${b})`;
    }
}

// --- Draw particles ---
function draw_particles() {
    MBMc.clearRect(0, 0, simWidth, simHeight);
    for (let i = 0; i < particles.length; i++) {
        let [[x, y], , , color] = particles[i];
        MBMc.fillStyle = color;
        MBMc.fillRect(x, y, particle_size, particle_size);
    }
}

// --- Update particle positions ---
function update_particles() {
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        let [pos, speed, angle] = particle;
        let x = pos[0];
        let y = pos[1];

        x += Math.cos(angle) * speed;
        y += Math.sin(angle) * speed;

        if (x <= 0 || x + particle_size >= simWidth) angle = Math.PI - angle;
        if (y <= 0 || y + particle_size >= simHeight) angle = -angle;

        particle[0][0] = Math.min(Math.max(x, 0), simWidth - particle_size);
        particle[0][1] = Math.min(Math.max(y, 0), simHeight - particle_size);
        particle[2] = angle;
    }
}

function update_speed_count() {
    particle_speed_count = {}
    for (let i = 0; i < particles.length; i++) {
        if (particle_speed_count[particles[i][1]]) {
            particle_speed_count[particles[i][1]] += 1
        } else {
            particle_speed_count[particles[i][1]] = 1;
        }
    }
}

// --- Draw smooth speed curve based on particle speeds ---
function draw_speed_curve() {
    histCtx.clearRect(0, 0, graphWidth, graphHeight);
    if (particles.length === 0) return;

    let speeds = particles.map(p => p[1]);
    let maxV = 25;
    let bins = 200;
    let curve = Array(maxV + 1).fill(0);
    let step = maxV / bins;
    let bandwidth = 1.0;

    for (let i = 0; i <= maxV; i++) {
        let v = i * step;
        if (particle_count > 0 && particle_speed_count[i]) {
            curve[i] = particle_speed_count[i]/particle_count * 2;
        } else {
            curve[i] = 0
        }
    }

    // --- Axis margins ---
    let leftMargin = 50;
    let bottomMargin = 40;
    let plotWidth = graphWidth - leftMargin - 10;
    let plotHeight = graphHeight - bottomMargin - 10;

    // --- Draw curve ---
    histCtx.beginPath();
    for (let i = 0; i <= maxV; i++) {
        let x = leftMargin + (i / maxV) * plotWidth;
        let y = plotHeight - (curve[i] * plotHeight) + 10;
        if (i === 0) histCtx.moveTo(x, y);
        else histCtx.lineTo(x, y);
    }
    histCtx.strokeStyle = "orange";
    histCtx.lineWidth = 2;
    histCtx.stroke();

    // --- Draw axes ---
    histCtx.strokeStyle = "black";
    histCtx.lineWidth = 1;
    histCtx.beginPath();
    // y-axis
    histCtx.moveTo(leftMargin, 10);
    histCtx.lineTo(leftMargin, plotHeight + 10);
    // x-axis
    histCtx.lineTo(leftMargin + plotWidth, plotHeight + 10);
    histCtx.stroke();

    // --- Draw ticks and numbers ---
    histCtx.fillStyle = "black";
    histCtx.font = "12px sans-serif";
    histCtx.textAlign = "center";
    histCtx.textBaseline = "middle";

    // x-axis ticks
    let xTicks = 5;
    for (let i = 0; i <= xTicks; i++) {
        let xVal = i * maxV / xTicks;
        let x = leftMargin + (i / xTicks) * plotWidth;
        let y = plotHeight + 10;
        histCtx.beginPath();
        histCtx.moveTo(x, y);
        histCtx.lineTo(x, y + 5);
        histCtx.stroke();
        histCtx.fillText(xVal.toFixed(0), x, y + 15);
    }
    histCtx.fillText("Speed", leftMargin + plotWidth / 2, graphHeight - 10);

    // y-axis ticks
    let yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
        let yVal = (i / yTicks)/2;
        let y = plotHeight - (yVal * plotHeight)*2 + 10;
        let x = leftMargin;
        histCtx.beginPath();
        histCtx.moveTo(x - 5, y);
        histCtx.lineTo(x, y);
        histCtx.stroke();
        histCtx.textAlign = "right";
        histCtx.fillText(yVal.toFixed(1), x - 8, y);
    }

    // y-axis label
    histCtx.save();
    histCtx.translate(15, 10 + plotHeight / 2);
    histCtx.rotate(-Math.PI / 2);
    histCtx.textAlign = "center";
    histCtx.fillText("% of particles", 0, 0);
    histCtx.restore();
}

// --- Temperature slider ---
tempS.oninput = function() {
    let T = Number(this.value) / 10 + 1;
    tempO.textContent = this.value;
    updateProbArray(T);
    updateParticleSpeeds(T);
    update_speed_count()
};

// --- Particle slider ---
partS.oninput = function() {
    particle_count = Number(this.value);
    partO.textContent = this.value;
    update_speed_count()
};

// --- Animation loop ---
function animate() {
    if (particle_count != particles.length) {
        while (particle_count > particles.length) {
            add_particles()
        }
        while (particle_count < particles.length) {
            particles.pop()
        }
    }
    update_particles();
    draw_particles();
    draw_speed_curve();
    requestAnimationFrame(animate);
}

// --- Initialize ---
updateProbArray(Number(tempS.value) / 10 + 1);
animate();

update_speed_count()