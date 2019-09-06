<template>
  <div class="game flex column">
    <div class="rank">
      <div class="flex row justify-flex-end">
        rank
      </div>
    </div>
    <div class="flex row justify-center">
      <game-canvas v-if="connected"/>
    </div>
  </div>
</template>

<script>
import { GameCanvas } from '@/components/atoms';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'game',
  layout: 'game',
  components: {
    GameCanvas
  },
  computed: {
    ...mapState('game', ['connected'])
  },
  mounted() {
    if (!this.socketId) {
      this.initializeSocket(window.io);
    }
  },
  methods: {
    ...mapActions('game', ['initializeSocket'])
  }
};
</script>

<style lang="scss" scoped>
.game {
  .rank {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
}
</style>
