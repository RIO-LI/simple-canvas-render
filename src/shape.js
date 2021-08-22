let _uuid = Date.now();

export default class {
  constructor(type, painter, config, behaviors) {
    this.type = type;
    this.uuid += _uuid;
    this.behaviors = behaviors ? behaviors : [];
    this.painter = painter;
    this.config = config;
  }

  paint() {
    this.painter.paint(this);
  }

  update(timestamp, duration, fps) {
    this.painter.ctx.clearRect(
      0,
      0,
      this.painter.ctx.canvas.width,
      this.painter.ctx.canvas.height
    );
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
}
