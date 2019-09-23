<template>
  <div class="game flex column">
    <div v-if="top10players.length" class="rank-wrapper">
      <div class="flex row justify-flex-end">
        <rank :players="top10players"/>
      </div>
    </div>
    <div class="flex row justify-center">
      <game-canvas v-if="connected"/>
    </div>
    <div class="score-wrapper">
      <div class="flex row">
        <score :score="player.score" />
      </div>
    </div>
    <div v-if="player.id && !player.live" class="gameover-wrapper">
      <div class="flex row fill-height justify-center align-items-center">
        <div class="game-over">
          <game-over :score="player.lastScore"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GameCanvas, Rank, Score } from '@/components/atoms';
import { GameOver } from '@/components/molecules';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'game',
  layout: 'game',
  validate ({ redirect, store }) {
    if (!store.state.game.socketId) {
      redirect('/');
    }
    return true;
  },
  components: {
    GameCanvas,
    Rank,
    Score,
    GameOver
  },
  computed: {
    ...mapState('game', ['connected', 'socketId', 'players']),
    ...mapGetters('game', ['player']),
    top10players () {
      return this.players.filter((player, index) => index < 10 && player.live);
    }
  }
};
</script>

<style lang="scss" scoped>
.game {
  .rank-wrapper, .gameover-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
  .score-wrapper {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .gameover-wrapper {
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
}
</style>
