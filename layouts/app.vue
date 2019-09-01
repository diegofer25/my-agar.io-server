<template>
  <div class="app-layout flex column mt-sm">
    <div class="flex-item grow">
      <div class="flex row justify-flex-end">
        <app-select
          class="mr-sm"
          :label="$t('language')"
          :items="formatedLocales"
          :value="locale"
          field-text="text"
          field-value="value"
          @input="changeLanguage"
        />
      </div>
    </div>
    <div class="flex-item grow">
      <div class="flex row justify-center">
        <h1 class="font display-2 medium text-xs-center my-md" v-text="appName"></h1>
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
  name: 'App',
  components: {
    AppSelect
  },
  computed: {
    ...mapState(['locales', 'locale', 'appName']),
    formatedLocales () {
      return this.locales.map(locale => {
        return {
          text: this.$t(`locales.${locale}`),
          value: locale
        };
      });
    }
  },
  methods: {
    ...mapActions(['changeLanguage']),
  },
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
