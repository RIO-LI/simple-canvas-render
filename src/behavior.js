export class Rotate {
  execute(shape, ctx, timestamp, duration, fps) {
    const { config } = shape;
    config.angle = config.angle != null ? config.angle : 0;
    config.angle = (10 * (Math.PI / 180) * timestamp) / 1000;
  }
}

export class Translate {
  execute(shape, ctx, timestamp, duration, fps) {
      const { config } = shape;
      const x = 4 * timestamp / 1000;
      const y = 1 * timestamp / 1000;
      config.x += x;
      config.y += y;
  }
}
