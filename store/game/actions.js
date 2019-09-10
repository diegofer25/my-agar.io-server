import Services from './../../services';
import { handleEvents } from '@/utils';

export default {
  startGame({ dispatch, commit, getters }, ctx) {
    this.ctx = ctx;
    const { gameService } = new Services(this);

    dispatch('listenPlayerControls');

    gameService.start();

    gameService.onServerUpdate(({ players }) => {
      commit('SET_PLAYERS', players);
      // if (getters.player.live) {
      //   this.socketService.emit('player-move', getters.mouseDirection);
      // }
    });

    setInterval(() => {
      if (getters.player.live) {
        this.socketService.emit('player-move', getters.mouseDirection);
      }
    }, 1000 / 60);

    gameService.onGameOver(() => {
      dispatch('processGameOver');
    });
  },

  processGameOver ({ commit }) {
    commit('SET_GAME_OVER', true);
  },

  listenPlayerControls ({ commit, state, getters }) {
    handleEvents.listenEvent('mousemove', ({ x, y }) => {
      if (
        (state.mousePosition.x !== x ||
        state.mousePosition.y !== y) &&
        state.socketId && getters.player.live
      ) {
        commit('SET_MOUSE_POSITION', { x, y });
      }
    });
  },

  initializeSocket({ dispatch, commit }, io) {
    const { socketService } = new Services({ io });
    socketService.listen('connect', () => {
      this.socketService = socketService;
      dispatch('listenPlayersStatistics', socketService);
      commit('SET_SOCKET_ID', socketService.socketId);
      commit('SET_CONNECTED', true);
    });
  },

  listenPlayersStatistics({ commit }, socketService) {
    socketService.listen('addPlayerStatistic', (socketId) => {
      if (socketService.socketId !== socketId) {
        commit('SET_STATISTICS', { playersCount: this.state.statistics.playersCount + 1 }, { root: true });
      }
    });

    socketService.listen('removePlayerStatistic', (socketId) => {
      if (socketService.socketId !== socketId) {
        commit('SET_STATISTICS', { playersCount: this.state.statistics.playersCount - 1 }, { root: true });
      }
    });
  }
};
