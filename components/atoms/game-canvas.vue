<template>
  <div class="game-canvas">
    <canvas
      ref="canvas"
      id="canvas"
      :width="canvas.width"
      :height="canvas.height"
    ></canvas>
    <slot />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';
export default {
  name: 'game-canvas',
  data: () => ({
    provider: {
      ctx: null
    }
  }),
  provide () {
    return {
      provider: this.provider,
    };
  },
  mounted() {
    this.setCanvas({ height: window.innerHeight, width: window.innerWidth });
    this.setPlayer({
      ...this.getPlayer,
      position: [
        window.innerHeight / 2,
        window.innerWidth / 2
      ]
    });

    this.provider.ctx = this.$refs.canvas.getContext('2d');

    this.startGame(this.provider.ctx);
  },
  computed: {
    ...mapState('game', ['canvas']),
    ...mapGetters('game', ['getPlayer'])
  },
  methods: {
    ...mapActions('game', ['startGame']),
    ...mapMutations('game', {
      setPlayer: 'SET_PLAYER',
      setCanvas: 'SET_CANVAS'
    }),
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables/colors";
#canvas {
  background: $white;
}
</style>
