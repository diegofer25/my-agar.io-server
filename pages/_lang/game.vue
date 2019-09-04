<template>
  <div class="game flex column">
    <div class="flex row justify-center">
      <game-canvas v-if="connected"/>
    </div>
    <div class="language flex row justify-flex-end mr-xs">
      <select-language />
    </div>
  </div>
</template>

<script>
import { GameCanvas } from '@/components/atoms';
import { SelectLanguage } from '@/components/molecules';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'game',
  layout: 'game',
  components: {
    SelectLanguage,
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
  .language {
    position: relative;
    .select-language {
      position: fixed;
      bottom: 0;
    }
  }
}
</style>
