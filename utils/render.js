export default class Render {
  constructor ({ ctx, width, height }) {
    this.ctx = ctx;
    this.world = { x: width, y: height };
    this.draws = [];
    this.rendering = false;
  }

  start () {
    this.rendering = true;
    this.render();
  }

  stop () {
    this.rendering = false;
  }

  render () {
    this.ctx.clearRect(0,0, innerWidth, innerHeight);
    for (let draw of this.draws) {
      draw(this);
    }
    if (this.rendering) {
      window.requestAnimationFrame(this.start.bind(this));
    }
  }

  add (draw) {
    this.draws.push(draw);
  }
}
