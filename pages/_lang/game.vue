<template>
  <div class="game flex column">
    <div class="flex row justify-center">
      <game-canvas>
        <player
          :key="player.lastUpdate"
          :position="player.position"
          :length="player.length"
          :color="player.color"
          @move="handlePlayerMove"
        />
      </game-canvas>
    </div>
    <div class="language flex row justify-flex-end mr-xs">
      <select-language />
    </div>
  </div>
</template>

<script>
import { player } from '@/components/bosons';
import { GameCanvas } from '@/components/atoms';
import { SelectLanguage } from '@/components/molecules';
export default {
  name: 'game',
  layout: 'game',
  components: {
    SelectLanguage,
    GameCanvas,
    player
  },
  data() {
    return {
      player: {
        id: 1,
        position: [10, 10],
        length: [10, 10],
        color: '#e92727'
      }
    };
  },
  methods: {
    handlePlayerMove (move) {
      this.player.position = move;
    }
  },
};
</script>

<style lang="scss" scoped>
.game {
  .language {
    position: relative;
    .select-language {
      position: fixed;
      bottom: 0;
    }
  }
}
</style>
