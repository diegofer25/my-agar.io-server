<template>
  <app-select
    class="select-language mr-sm mt-sm"
    :label="$t('language')"
    :items="formatedLocales"
    :value="locale"
    field-text="text"
    field-value="value"
    @input="changeLanguage"
  />
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { AppSelect } from '@/components/atoms';

export default {
  name: 'select-language',
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

<style lang="scss" scoped>
.select-language {
  background-color: rgba(0,0,0,0.7);
  padding: 10px;
  color: white;
  border-radius: 5px;
}
</style>
