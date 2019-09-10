<template>
  <div class="score pa-sm mb-xs ml-xs">
    <span class="font title" v-text="`${$t('game.score')}: ${score}`"></span>
  </div>
</template>

<script>
export default {
  name: 'score',
  props: {
    score: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
  .score {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
</style>
