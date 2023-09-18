const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.lineWidth = 20;
ctx.lineCap = "round";

// ctx.beginPath();
// ctx.moveTo(100, 100);
// ctx.lineTo(200, 200);
// ctx.stroke();

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
  }

  draw() {
    ctx.fillRect(this.x, this.y, 50, 50);
  }
}

class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.particles = [];
    this.numberOfParticles = 50;
    this.init();
  }

  init() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  render(context) {
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
  }
}

const effect = new Effect(canvas.width, canvas.height);

effect.render(ctx);
