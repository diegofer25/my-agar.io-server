export const state = () => ({
  locales: ['pt-br', 'en', 'pt', 'ru', 'fr'],
  locale: 'pt-br'
});


export const actions = {
  changeLanguage ({ commit, state }, language) {
    if (state.locales.some(({ value }) => value === language)) {
      commit('SET_LOCALE', language);
    }
  }
};

export const mutations = {
  SET_LOCALE (state, locale) {
    state.locale = locale;
  }
};
