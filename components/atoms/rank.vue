<template>
<div class="rank flex column justify-center pa-md mt-xs mr-xs">
  <div class="header flex row justify-center align-items-center mb-xs">
    <i class="material-icons mr-xs">format_list_numbered</i>
    <span class="font display-1 bold" v-text="$t('game.rank')"></span>
  </div>
  <div class="body flex column justify-center">
    <table>
      <thead>
        <th class="text-xs-left" v-text="$t('game.player')"></th>
        <th v-text="$t('game.score')"></th>
      </thead>
      <tbody>
        <tr v-for="player of players" :key="player.id">
          <td v-text="player.id"></td>
          <td v-text="player.score"></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  name: 'rank',
  props: {
    players: {
      type: Array,
      default: () => []
    }
  }

};
</script>

<style lang="scss" scoped>
  .rank {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
</style>
