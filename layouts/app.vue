<template>
  <div ref="app" class="app-layout flex column">
    <div ref="lang" class="flex row justify-flex-end">
      <select-language />
    </div>
    <div class="flex-item grow">
      <div class="flex row justify-center fill-height align-items-center">
        <div ref="app-container" class="app-container flex column pb-lg px-lg">
          <div class="flex-item grow">
            <div class="flex row justify-center">
              <h1 class="app-title font display-2 medium text-xs-center my-md" v-text="appName"></h1>
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
import { TweenLite, Power2 } from 'gsap';
export default {
  name: 'App',
  components: {
    SelectLanguage
  },
  computed: {
    ...mapState(['locales', 'locale', 'appName'])
  },
  mounted () {
    this.$nextTick(() => {
      this.welcomeAnimetion();
    });
  },
  methods: {
    welcomeAnimetion () {
      const app = this.$refs['app'];
      TweenLite.to(app, 2, { ease: Power2.easeOut, opacity: 1 });

      const lang = this.$refs['lang'];
      TweenLite.from(lang, 0.5, { ease: Power2.easeOut, y: -100, delay: 0.3 });

      const appContainer = this.$refs['app-container'];
      TweenLite.from(appContainer, 1, { ease: Power2.easeOut, scale: 2, delay: 0.1 });
    }
  },
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
  background: url('/images/wallpaper.png') center no-repeat;
  background-size: cover;
  opacity: 0;
  .app-container {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    color: white;
  }
}
</style>
