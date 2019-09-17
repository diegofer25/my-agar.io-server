<template>
  <div ref="gameover" class="game-over flex column pa-lg">
    <div class="flex-item grow">
      <div class="flex row justify-center">
        <span class="font bold display-1" v-text="$t('game.over')"></span>
      </div>
    </div>
    <div class="flex-item grow my-md">
      <div class="flex row justify-center">
        <span class="font title" v-text="`${$t('game.score')}: ${parseInt(computedScore)}`"></span>
      </div>
    </div>
    <div class="flex-item grow mt-sm">
      <app-button class="text-white" :text="$t('game.playAgain')" color="teal" @click="playAgain"/>
    </div>
  </div>
</template>

<script>
import { AppButton } from '@/components/atoms';
import { TweenMax } from 'gsap';
import { mapActions } from 'vuex';
export default {
  name: 'game-over',
  components: {
    AppButton
  },
  props: {
    score: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      computedScore: 0
    };
  },
  mounted() {
    TweenMax.from(this.$refs.gameover, 0.5, { scale: 1.5 });
    TweenMax.to(this, 2, {computedScore: this.score, delay: 0.5 });
  },
  methods: {
    ...mapActions('game', ['playAgain'])
  },
};
</script>

<style lang="scss" scoped>
  .game-over {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  }
</style>
