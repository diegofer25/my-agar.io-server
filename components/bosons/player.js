import { handleEvents } from '@/mixins';
import { mapState, mapMutations } from 'vuex';

export default {
  inject: ['provider'],
  mixins: [handleEvents],
  computed: {
    ...mapState('game', ['socketId'])
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
    color: String
  },
  mounted() {
    if (this.player.id === this.socketId) {
      this.listenEvent('mousemove', ({ x, y }) => {
        this.setMousePosition([ x - this.player.length / 2, y - this.player.length / 2 ]);
      });
    }
  },
  methods: {
    ...mapMutations('game', { setMousePosition: 'SET_MOUSE_POSITION' }),

    drawPlayer (player) {
      const ctx = this.provider.ctx;

      ctx.beginPath();
      ctx.arc(...player.position, player.length, 0, 3 * Math.PI, false);
      ctx.fillStyle = player.color || '#000000';
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(204, 204, 204, 0.7)';
      ctx.fill();
    },
  },
  render () {
    if(this.provider.ctx) {
      this.drawPlayer(this.player);
    }
  }
};
