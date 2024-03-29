import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'pt-br',
    messages: {
      'en': require('~/locales/en.json'),
      'pt-br': require('~/locales/pt-br.json'),
      'es': require('~/locales/es.json'),
      'ru': require('~/locales/ru.json'),
      'ar': require('~/locales/ar.json'),
      'zh': require('~/locales/zh.json'),
      'hi': require('~/locales/hi.json')
    }
  });

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }

    return `/${app.i18n.locale}/${link}`;
  };
};
