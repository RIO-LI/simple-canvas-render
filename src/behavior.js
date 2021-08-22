export class Rotate {
  execute(shape, ctx, timestamp, duration, fps) {
    const { config } = shape;
    config.angle = (10 * (Math.PI / 180) * timestamp) / 1000 / fps;
  }
}

export class Translate {
  execute(shape, ctx, timestamp, duration, fps) {
    const { config } = shape;
    const x = (10 * timestamp) / 1000 / fps;
    const y = (5 * timestamp) / 1000 / fps;
    config.x = x;
    config.y = y;
  }
}
