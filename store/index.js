export const state = () => ({
  appName: '',
  locales: ['pt-br', 'en', 'zh', 'es', 'hi', 'ar', 'ru'],
  locale: 'pt-br',
  statistics: {
    playersCount: 0,
    roomsCount: 0
  }
});

export const actions = {
  async nuxtServerInit ({ commit, state }, { env, $axios }) {
    if (env.appName) {
      commit('SET_APP_NAME', env.appName);
    }
    const data = await $axios.$get('/api/app/statistics');
    commit('SET_STATISTICS', {
      playersCount: state.statistics.playersCount + data.playersCount,
      roomsCount: state.statistics.roomsCount + data.roomsCount
    });
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
  },

  SET_STATISTICS(state, { playersCount, roomsCount }) {
    state.statistics = {
      playersCount: state.statistics.playersCount + playersCount,
      roomsCount: state.statistics.roomsCount + roomsCount
    };
  }
};
