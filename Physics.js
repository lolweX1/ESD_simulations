class Pendulum {
    constructor(length, gravity, rotation = 0) {
        this.length = length;
        this.gravity = gravity;
        this.rotation = 0;
    } 

    get_length() {
        return this.length;
    }
    get_gravity() {
        return this.gravity;
    }
    get_rotation() {
        return this.rotation;
    }
    set_length(l) {
        this.length = l;
    }
    set_gravity(g) {
        this.gravity = this.gravity;
    }
    set_rotation(deg) {
        this.rotation = deg;
    }
}

class simple_pendulum extends Pendulum {
    constructor(length, gravity, rotation=0) {
        super(length, gravity, rotation);
        this.Time = 0;
        this.velocity = 0;
        this.flip = false;
    }

    calculateTime() {
        this.Time = 2 * Math.PI * Math.sqrt(this.length/this.gravity);
        return this.Time;
    }
    nextPhase(ms) {
        this.velocity += this.gravity * (ms/1000);
    }
}