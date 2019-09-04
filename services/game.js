import { Render } from '@/utils';

export default class GameService {
  constructor({ ctx, socketService }) {
    this.playing = false;
    this.gameLoop = 0;
    this.gameFrame = 50;
    this.gameUpdate = { players: [] };
    this.render = new Render({ ctx, width: 4000, height: 4000 });
    this.socketService = socketService;
    this.jobs = [];
  }

  get currentPlayer () {
    return this.gameUpdate.players.find(p => p.id === this.socketService.socketId) || {};
  }

  start () {
    this.socketService.listen('gameUpdate', (gameUpdate) => {
      this.gameUpdate = gameUpdate;
      this.checkRank();
      for (let job of this.jobs) {
        job(this);
      }
      if (!this.playing) {
        this.playing = true;
        this.render.add(this.drawBackGround.bind(this));
        this.render.add(this.renderPlayers.bind(this));
        this.render.start();
      }
    });
  }

  onServerUpdate (callback) {
    this.jobs.push(callback);
  }

  drawBackGround ({ ctx, world }) {
    ctx.draw(() => {
      ctx.translate(innerWidth/2, innerHeight/2);
      ctx.scale(this.currentPlayer.scaleVision, this.currentPlayer.scaleVision);
      const { x, y } = this.currentPlayer.position;
      ctx.translate(-x, -y);

      ctx.beginPath();

      let gridWidth = 100;
      let gcount = (world.x/2) / gridWidth;

      for(var i=-gcount;i<=gcount;i++){
        ctx.moveTo(i*gridWidth,-world.x/2);
        ctx.lineTo(i*gridWidth,world.x/2);
        ctx.moveTo(-world.y/2,i*gridWidth);
        ctx.lineTo(world.y/2,i*gridWidth);
      }
      ctx.strokeStyle='rgba(0,0,0,0.5)';
      ctx.stroke();
    });
  }

  renderPlayers ({ ctx }) {
    this.gameUpdate.players.forEach((player) => {
      const { position, radius, color } = player;
      ctx.draw(() => {
        ctx.beginPath();
        ctx.circle(position, radius * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
    });
  }

  checkRank () {
    this.gameUpdate.players = this.gameUpdate.players.sort((p1, p2) => p1.radius - p2.radius);
  }
}
