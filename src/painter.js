export class Painter {
  constructor(ctx) {
    this._ctx = ctx;
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.setAttribute('width', this._ctx.canvas.width);
    this.offscreenCanvas.setAttribute('height', this._ctx.canvas.height);
    this.ctx = this.offscreenCanvas.getContext('2d');
    this.shapes = [];
    this.timeController = null;
    
    
  }

  setTimeController(timeController) {
    this.timeController = timeController;
  }

  paint() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (let i = 0, len = this.shapes.length; i < len; i++) {
      const shape = this.shapes[i];
      const timeGap = this.timeController.getTimeGap();
      const fps = this.timeController.getFps();
      this.ctx.save();
      this.ctx.beginPath();
      shape.update(
        timeGap,
        this.timeController.duration,
        fps
      );
      shape.buildPath();
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.restore();
    }
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    this._ctx.drawImage(this.offscreenCanvas, 0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  }

  add(shape) {
    this.shapes.push(shape);
    shape.setPainter(this);
  }

  remove(shape) {
    this.shapes = this.shapes.filter(item => item != shape);
  }

}
