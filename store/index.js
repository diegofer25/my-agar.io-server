export const state = () => ({
  appName: '',
  locales: ['pt-br', 'en', 'zh', 'es', 'hi', 'ar', 'ru'],
  locale: 'pt-br'
});

export const actions = {
  nuxtServerInit ({ commit }, { env }) {
    if (env.appName) {
      commit('SET_APP_NAME', env.appName);
    }
  },

  changeLanguage ({ state }, language) {
    if (state.locales.includes(language)) {
      const path = this.app.router.currentRoute.path;
      if (path.includes(state.locale)) {
        this.app.router.push(path.replace(state.locale, language));
      } else {
        this.app.router.push(`/${language + path}`);
      }
    }
  }
};

export const mutations = {
  SET_LOCALE (state, locale) {
    state.locale = locale;
  },

  SET_APP_NAME (state, appName) {
    state.appName = appName;
  }
};
