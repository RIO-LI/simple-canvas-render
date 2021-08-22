import Easing from "./tween";

class TimeController {
  constructor(duration, easing) {
    this.duration = duration;
    this.startTime = Date.now();
    this.easing = easing;
  }

  getTimeGap() {
    const gap = Date.now() - this.startTime;
    return this.duration * (this.easing(gap) / gap);
  }

  reset(time) {
    this.startTime = time != null ? time : Date.now();
  }

  isOver() {
    return Date.now() - this.startTime >= this.duration;
  }

  getFps() {
    return this.getTimeGap() / 60;
  }
}

export class Animator {
  constructor(shapes, duration, easing = Easing.Linear.None) {
    this.shapes = shapes || [];
    this.duration = duration;
    this.timeController = new TimeController(this.duration, easing);
    this.isRuning = false;
    this.requestAnimationFrameId = undefined;
  }

  animate(time) {
    console.log(`time: ${time}`);
    if (!this.timeController.isOver() && this.isRuning) {
      for (let i, len = this.shapes.length; i < len; i++) {
        const shape = this.shapes[i];
        shape.update(
          this.timeController.getTimeGap(),
          this.timeController.duration,
          this.getFps()
        );
        shape.paint();
      }
      this.requestAnimationFrameId = window.requestAnimationFrame(
        this.animate.bind(this)
      );
    } else {
      this.stop();
    }
  }

  start() {
    const time = Date.now();
    this.isRuning = true;
    this.timeController.reset(time);
    this.animate(time);
  }
  stop() {
    this.isRuning = false;
    window.cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = undefined;
  }
}
