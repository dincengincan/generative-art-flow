const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.lineWidth = 1;
ctx.lineCap = "round";

// ctx.beginPath();
// ctx.moveTo(25, 100);
// ctx.lineTo(50, 50);
// ctx.lineTo(200, 200);
// ctx.lineTo(300, 400);
// ctx.stroke();

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.history = [{ x: this.x, y: this.y }];
    this.lifeSpan = Math.floor(Math.random() * 100 + 20);
    this.wiggle = 4;
  }

  draw(context) {
    context.fillRect(this.x, this.y, 10, 10);
    context.beginPath();
    context.moveTo(this.history[0].x, this.history[0].y);

    for (let i = 1; i < this.history.length; i++) {
      context.lineTo(this.history[i].x, this.history[i].y);
    }

    context.stroke();
  }

  update() {
    this.x += this.speedX + Math.random() * (this.wiggle * 2) - this.wiggle;
    this.y += this.speedY + Math.random() * (this.wiggle * 2) - this.wiggle;
    this.history.push({ x: this.x, y: this.y });

    if (this.history.length > this.lifeSpan) {
      this.history.shift();
    }
  }
}

class Effect {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.particles = [];
    this.numberOfParticles = 10;
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
