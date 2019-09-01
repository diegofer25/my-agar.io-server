<template>
  <div class="flex column wrap">
    <div class="flex-item grow">
        <div class="flex row justify-center mb-md">
          <p class="font headline my-none" v-text="$t('home.menu')"></p>
        </div>
      <div class="flex row justify-center mr-sm mb-md">
        <span v-text="$t('players')"></span>: <b class="ml-xs" v-text="statistics.playersCount"></b>
        <span class="mx-sm">|</span>
        <span v-text="$t('rooms')"></span>: <b class="ml-xs" v-text="statistics.roomsCount"></b>
      </div>
      <div class="flex row justify-center">
        <app-button class="text-white" :text="$t('home.create-room')" color="teal" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { AppButton } from '@/components/atoms';

export default {
  name: 'Index',
  layout: 'app',
  components: {
    AppButton
  },
  computed: {
    ...mapState('app', ['statistics'])
  },
  async mounted() {
    await this.loadStatistics();
  },
  methods: {
    ...mapActions('app', ['loadStatistics', 'initializeSocket'])
  },
};
</script>

<style lang="scss"></style>
