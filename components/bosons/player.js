import { handleEvents } from '@/mixins';
import { mapState, mapMutations } from 'vuex';

export default {
  inject: ['provider'],
  mixins: [handleEvents],
  computed: {
    ...mapState('game', ['socketId', 'canvas'])
  },
  data() {
    return {
      mousePosition: [-25, -25]
    };
  },
  props: {
    player: {
      type: Object,
      required: true
    },
    index: Number,
    color: String
  },
  mounted() {
    if (this.player.id === this.socketId) {
      this.listenEvent('mousemove', ({ x, y }) => {
        this.setMousePosition([ x - this.player.radius, y - this.player.radius ]);
      });
    }
  },
  methods: {
    ...mapMutations('game', { setMousePosition: 'SET_MOUSE_POSITION' }),

    drawPlayer (player) {
      const ctx = this.provider.ctx;
      // if (this.index === 0) {
      //   ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // }
      ctx.save();
      ctx.beginPath();
      ctx.arc(...player.position, player.length, 0, 3 * Math.PI, false);
      ctx.fillStyle = player.id === this.socketId ? '#000000' : '#999999';
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(204, 204, 204, 0.7)';
      ctx.fill();
      ctx.restore();
    }
  },
  render () {
    if(this.provider.ctx) {
      this.drawPlayer(this.player);
    }
  }
};
