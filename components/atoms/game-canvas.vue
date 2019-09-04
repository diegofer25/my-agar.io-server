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
import { mapActions } from 'vuex';
export default {
  name: 'game-canvas',
  data: () => ({
    canvas: {
      width: innerWidth,
      height: innerHeight
    }
  }),
  mounted() {
    window.addEventListener('resize', ({ target }) => {
      this.canvas = {
        width: target.innerWidth,
        height: target.innerHeight
      };
    });
    this.start();
  },
  methods: {
    ...mapActions('game', ['startGame']),
    start () {
      const canvas = this.$refs.canvas;
      canvas.oncontextmenu = function (e) {
        e.preventDefault();
      };
      const ctx = canvas.getContext('2d');
      ctx.circle = function ({x, y}, radius) {
        this.arc(x, y, radius, 0, Math.PI*2);
      };
      ctx.draw = function (callback) {
        this.save();
        callback(this);
        this.restore();
      };

      this.startGame(ctx);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables/colors";
#canvas {
  background: $white;
}
</style>
