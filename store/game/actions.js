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
      this.socketService.emit('player-move', getters.mouseDirection);
    });
  },

  listenPlayerControls ({ commit, state }) {
    handleEvents.listenEvent('mousemove', ({ x, y }) => {
      if (
        (state.mousePosition.x !== x ||
        state.mousePosition.y !== y)
      ) {
        commit('SET_MOUSE_POSITION', { x, y });
      }
    });
  },

  initializeSocket({ dispatch, commit }, io) {
    const { socketService } = new Services({ io });
    socketService.listen('connect', () => {
      dispatch('listenPlayersStatistics', socketService);
      commit('SET_SOCKET_ID', socketService.id);
      commit('SET_CONNECTED', true);
      this.socketService = socketService;
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
