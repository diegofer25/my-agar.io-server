<template>
  <div class="flex column wrap">
    <div class="flex-item grow">
      <div class="flex row justify-flex-end mr-sm">
        <span v-text="$t('players')"></span>: <b class="ml-xs" v-text="statistics.playersCount"></b>
        <span class="mx-sm">|</span>
        <span v-text="$t('rooms')"></span>: <b class="ml-xs" v-text="statistics.roomsCount"></b>
      </div>
    </div>
    <div class="flex row justify-center">
      <p class="font headline my-none" v-text="$t('home.menu')"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Index',
  layout: 'app',
  computed: {
    ...mapState('app', ['statistics'])
  },
  async asyncData({ store, $axios }) {
    const { data } = await $axios.get('/api/app/statistics');
    store.commit('app/SET_STATISTICS', data);
  },
};
</script>

<style lang="scss"></style>
