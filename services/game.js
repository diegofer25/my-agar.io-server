import { Render } from '@/utils';

export default class GameService {
  constructor({ ctx, socketService }) {
    this.playing = false;
    this.gameLoop = 0;
    this.gameFrame = 50;
    this.players = [];
    this.foods = [];
    this.render = new Render({
      ctx,
      width: 4000,
      height: 4000
    });
    this.socketService = socketService;
    this.jobs = [];
    this.theme = 'light';
  }

  get currentPlayer () {
    return this.players.find(p => p.id === this.socketService.socketId) || {};
  }

  setTheme (theme) {
    this.theme = theme;
  }

  start () {
    this.socketService.listen('gameUpdate', ({ players, foods }) => {
      this.players = this.orderByMass(players);
      this.foods = foods;
      for (let job of this.jobs) {
        job(this);
      }
      if (!this.playing) {
        this.playing = true;
        this.render.add((renderContext) => {
          renderContext.ctx.draw(() => {
            this.drawBackGround(renderContext);
            this.drawFoods(renderContext);
            this.drawPlayers(renderContext);
          });
        }).start();
      }
    });
  }

  onServerUpdate (callback) {
    this.jobs.push(callback);
  }

  drawBackGround ({ ctx, world, themes }) {
    ctx.fillStyle = themes[this.theme].bgColor;
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.translate(innerWidth / 2, innerHeight / 2);
    ctx.scale(this.currentPlayer.scaleVision, this.currentPlayer.scaleVision);
    const { x, y } = this.currentPlayer.position;
    ctx.translate(-x, -y);

    ctx.beginPath();

    let gridWidth = 200;
    let gcount = (world.x/2) / gridWidth;

    for(let i = -gcount; i <= gcount; i++){
      ctx.moveTo(i * gridWidth, -world.x / 2);
      ctx.lineTo(i * gridWidth, world.x / 2);
      ctx.moveTo(-world.y / 2, i * gridWidth);
      ctx.lineTo(world.y / 2, i * gridWidth);
    }

    ctx.strokeStyle = themes[this.theme].line;
    ctx.stroke();
  }

  drawPlayers ({ ctx }) {
    this.players.forEach((player) => {
      const { position, radius, color, live } = player;
      if (live) {
        ctx.draw(() => {
          ctx.beginPath();
          ctx.circle(position, radius * 2);
          ctx.fillStyle = color;
          ctx.fill();
        });
      }
    });
  }

  drawFoods ({ ctx }) {
    this.foods.forEach((food) => {
      const { position, radius, color } = food;
      ctx.draw(() => {
        ctx.beginPath();
        ctx.circle(position, radius * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
    });
  }

  orderByMass (players) {
    return players.sort((p1, p2) => p1.mass - p2.mass);
  }
}
