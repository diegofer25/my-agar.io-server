<template>
  <div class="flex column wrap">
    <div class="flex-item grow">
      <div class="flex row justify-center mr-sm mb-md">
        <span v-text="$t('home.players')"></span>: <b class="ml-xs" v-text="statistics.playersCount"></b>
        <span class="mx-sm">|</span>
        <span v-text="$t('home.rooms')"></span>: <b class="ml-xs" v-text="statistics.roomsCount"></b>
      </div>
      <div class="flex row justify-center">
        <app-button :nuxt-link="`/${locale}/game`" class="text-black" :text="$t('home.play')" color="white" full-width />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { AppButton } from '@/components/atoms';

export default {
  name: 'Index',
  layout: 'app',
  components: {
    AppButton
  },
  computed: {
    ...mapState(['locale', 'statistics'])
  }
};
</script>

<style lang="scss" scoped></style>
