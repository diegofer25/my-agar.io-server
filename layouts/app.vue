<template>
  <div class="app-layout flex column">
    <div class="flex-item grow">
      <div class="flex row justify-flex-end">
        <app-select :label="$t('language')" :items="locales" :value="locale" @input="changeLanguage"/>
      </div>
    </div>
    <div class="flex-item grow">
      <div class="flex row justify-center">
        <h1 class="font display-2" v-text="$t('appName')"></h1>
      </div>
    </div>
    <div class="flex-item grow fill-height">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { AppSelect } from '@/components/atoms';

export default {
  name: 'PurrinhaApp',
  components: {
    AppSelect
  },
  computed: {
    ...mapState(['locales', 'locale'])
  },
  mounted() {
    this.initializeSocket(window.io);
  },
  methods: {
    ...mapActions(['changeLanguage']),
    ...mapActions('app', ['initializeSocket'])
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
html,
body {
  margin: 0;
  font-family: 'Lato', sans-serif;
}
</style>
