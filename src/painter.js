export class CiclePainter {
  constructor(ctx) {
    this.ctx = ctx;
  }

  paint(shape) {
    const { config } = shape;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rotate(config.angle);
    this.ctx.arc(config.x, config.y, config.radius, 0, 2 * Math.PI, false);
    this.ctx.strokeStyle = config.strokeStyle;
    this.ctx.fillStyle = config.fillStyle;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  }
}

export class RectPainter {
  constructor(ctx) {
    this.ctx = ctx;
  }

  paint(shape) {
    const { config } = shape;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rotate(config.angle);
    this.ctx.rect(config.x, config.y, config.width, config.height);
    this.ctx.strokeStyle = config.strokeStyle;
    this.ctx.fillStyle = config.fillStyle;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  }
}
