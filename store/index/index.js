import STATE from './actions'

export const state = STATE

export const mutations = {
  SET_TITLE (state, text) {
    state.title = text
  },
  SET_PLAYERS (state, players) {
    state.players = players
  },
  SET_ROOMS (state, players) {
    state.players = players
  },
}

export const actions = {
  async createRoom (vuexContext) {
    console.log(vuexContext, this)
  }
}
