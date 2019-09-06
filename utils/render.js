export default class Render {
  constructor ({ ctx, width, height }) {
    this.ctx = ctx;
    this.world = { x: width, y: height };
    this.draws = [];
    this.rendering = false;
    this.themes =  {
      dark: {
        bgColor: '#151515',
        line: 'rgba(255, 255, 255, 0.5)'
      },
      light: {
        bgColor: 'rgb(240, 240, 240)',
        line: 'rgba(0, 0, 0, 0.5)'
      }
    };
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
    return this;
  }
}
