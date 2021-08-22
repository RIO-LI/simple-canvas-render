let _uuid = Date.now();

export class Element {
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
    for (let i = 0, len = this.behaviors.length;i < len;i++) {
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

export class Circle extends Element {
  constructor(painter, config, behaviors) {
    super('cicle', painter, config, behaviors);
  }

  buildPath() {
    const shape = this.config.shape;
    this.ctx.rotate(shape.angle);
    this.ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI, false);
    this.ctx.strokeStyle = shape.strokeStyle;
    this.ctx.fillStyle = shape.fillStyle;
  }

}

export class Rect extends Element {
  constructor(painter, config, behaviors) {
    super('rect', painter, config, behaviors);
  }

  buildPath() {
    const shape = this.config.shape;
    this.ctx.rotate(shape.angle);
    this.ctx.rect(shape.x, shape.y, shape.width, shape.height);
    this.ctx.strokeStyle = shape.strokeStyle;
    this.ctx.fillStyle = shape.fillStyle;
  }

}
