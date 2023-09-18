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
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
  }

  draw() {
    ctx.fillRect(this.x, this.y, 10, 10);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

class Effect {
  constructor(width, height) {
    this.height = height;
    this.width = width;
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
      particle.update();
    });
  }
}

const effect = new Effect(canvas.width, canvas.height);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render(ctx);

  requestAnimationFrame(animate);
}

animate();
