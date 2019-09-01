<template>
  <div class="game-canvas">
    <canvas
      ref="canvas"
      id="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'game-canvas',
  data: () => ({
    canvasHeight: 0,
    canvasWidth: 0,
    provider: {
      ctx: null,
      canvasHeight: 0,
      canvasWidth: 0,
    }
  }),
  provide () {
    return {
      provider: this.provider,
    };
  },
  mounted() {
    this.canvasHeight = window.innerHeight;
    this.canvasWidth = window.innerWidth;

    this.provider.ctx = this.$refs.canvas.getContext('2d');
    this.provider.canvasHeight = this.canvasHeight;
    this.provider.canvasWidth = this.canvasWidth;
  },
  beforeUpdate() {
    if (this.provider.ctx) {
      this.provider.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  },
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables/colors";
#canvas {
  background: $white;
}
</style>
