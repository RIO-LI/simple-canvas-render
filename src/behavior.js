export class Rotate {
  execute(element, ctx, timestamp, duration, fps) {
    const { config: { shape } } = element;
    shape.angle = shape.angle != null ? shape.angle : 0;
    shape.angle = (10 * (Math.PI / 180) * timestamp) / 1000;
  }
}

export class Translate {
  execute(element, ctx, timestamp, duration, fps) {
    const { config: { shape } } = element;
    const x = 4 * timestamp / 1000;
    const y = 1 * timestamp / 1000;
    shape.x += x;
    shape.y += y;
  }
}

export class ShapeChangeBehavior {
  execute(element, ctx, timestamp, duration, fps) {
    const { config: { shape } } = element;
  }
}
