<template>
  <div class="app-layout flex column">
    <div class="flex row justify-flex-end">
      <select-language />
    </div>
    <div class="flex-item grow">
      <div class="flex row justify-center fill-height align-items-center">
        <div class="app-container flex column pb-lg px-lg">
          <div class="flex-item grow">
            <div class="flex row justify-center">
              <h1 class="font display-2 medium text-xs-center my-md" v-text="appName"></h1>
            </div>
          </div>
          <div class="flex-item grow fill-height">
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { SelectLanguage } from '@/components/molecules';

export default {
  name: 'App',
  components: {
    SelectLanguage
  },
  computed: {
    ...mapState(['locales', 'locale', 'appName'])
  }
};
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
  html, body {
    height: 100%;
    overflow: hidden;
    margin: 0;
    font-family: 'Lato', sans-serif;
  }
</style>

<style lang="scss" scoped>
.app-layout {
  height: 100vh;
  background: url('/wallpaper.png') center no-repeat;
  background-size: cover;
  .app-container {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    color: white;
  }
}
</style>
