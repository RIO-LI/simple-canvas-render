let _uuid = Date.now();

export class Shape{
  constructor(type, config, behaviors) {
    this.type = type;
    this.uuid = _uuid++;
    this.behaviors = behaviors ? behaviors : [];
    this.painter = null;
    this.ctx = null;
    this.config = config;
  }

  buildPath() {
    // 抽象方法，由子类实现
  }

  update(timestamp, duration, fps) {
    for (let i = 0, len = this.behaviors.length; i < len; i++) {
      this.behaviors[i].execute(
        this,
        this.painter.ctx,
        timestamp,
        duration,
        fps
      );
    }
  }

  setPainter(painter) {
    this.painter = painter;
    this.ctx = this.painter.ctx;
  }
}

export class Circle extends Shape{
  constructor(painter, config, behaviors) {
    super('cicle', painter, config, behaviors);
  }

  buildPath() {
    const config = this.config;
    this.ctx.rotate(config.angle);
    this.ctx.arc(config.x, config.y, config.radius, 0, 2 * Math.PI, false);
    this.ctx.strokeStyle = config.strokeStyle;
    this.ctx.fillStyle = config.fillStyle;
  }

}

export class Rect extends Shape{
  constructor(painter, config, behaviors) {
    super('rect', painter, config, behaviors);
  }

  buildPath() {
    const config = this.config;
    this.ctx.rotate(config.angle);
    this.ctx.rect(config.x, config.y, config.width, config.height);
    this.ctx.strokeStyle = config.strokeStyle;
    this.ctx.fillStyle = config.fillStyle;
  }

}
