<template>
  <div class="home flex column wrap">
    <div class="flex-item grow">
      <div class="flex row justify-center mr-sm mb-md">
        <span v-text="$t('home.players')"></span>: <b class="ml-xs" v-text="statistics.playersCount"></b>
      </div>
      <div class="player-form flex column pa-md">
        <div class="flex row justify-center">
          <input-text v-model="player.name" :label="$t('home.typename')"/>
        </div>
        <div class="flex row justify-center">
          <color-picker v-model="player.color" :label="$t('home.pickcolor')"/>
        </div>
        <div class="flex row justify-center mt-md">
          <app-button
            :disabled="player.name.length < 2"
            @click="play(player)"
            class="text-black"
            :text="$t('home.play')"
            color="white"
            icon="games"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { AppButton, ColorPicker, InputText } from '@/components/atoms';

export default {
  name: 'Index',
  layout: 'app',
  components: {
    AppButton,
    ColorPicker,
    InputText
  },
  data: () => ({
    player: {
      name: '',
      color: '#000000'
    }
  }),
  computed: {
    ...mapState(['statistics'])
  },
  methods: {
    ...mapActions('game', ['initializeSocket']),

    play (player) {
      this.initializeSocket({ io: window.io, player });
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  .player-form {
    border: 1px solid white;
    border-radius: 5px;
  }
}
</style>
