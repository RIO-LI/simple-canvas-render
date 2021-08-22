import Easing from "./tween";

class TimeController {
  constructor(duration, easing) {
    this.duration = duration;
    this.startTime = Date.now();
    this.lastTime =  this.startTime;
    this.easing = easing;
  }

  getTimeGap() {
    const gap = Date.now() - this.startTime;
    if (gap <= 0) {
      return 0;
    } else {
      const gapPercent = gap / this.duration;
      const fillalTimeGap = gap * this.easing(gapPercent) / gapPercent;
      return fillalTimeGap;
    }
    
  }

  reset(time) {
    this.startTime = time != null ? time : Date.now();
    this.lastTime = this.startTime;
  }

  isOver() {
    return this.duration != Infinity ? (Date.now() - this.startTime) > this.duration : false;
  }


  getFps() {
    const currTime = Date.now();
    const gap = currTime - this.lastTime;
    this.lastTime = currTime;
    return gap > 0 ? 1000 / gap : 0;
  }
}

export class Animator {
  constructor(ctx, painter, duration, easing = Easing.Linear.None) {
    this.ctx = ctx;
    this.painter = painter;
    this.duration = duration;
    this.timeController = new TimeController(this.duration, easing);
    this.painter.setTimeController(this.timeController);
    this.isRuning = false;
    this.requestAnimationFrameId = undefined;
  }

  animate() {
    if (!this.timeController.isOver() && this.isRuning) {
      this.painter.paint();
      this.requestAnimationFrameId = window.requestAnimationFrame(() => {
        this.animate()
      });
    } else {
      this.stop();
    }
  }

  start() {
    this.isRuning = true;
    this.timeController.reset(Date.now());
    this.animate();
    return this;
  }
  stop() {
    this.isRuning = false;
    window.cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = undefined;
    this.finishCallback && this.finishCallback.call(this);
    return this;
  }

  finish(finishCallback) {
    this.finishCallback = finishCallback || function() {};
    return this;
  }
}
