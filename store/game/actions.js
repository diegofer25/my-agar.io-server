import Services from './../../services';
import { handleEvents } from '@/utils';

export default {
  startGame({ dispatch, state }, ctx) {
    this.ctx = ctx;
    const { gameService } = new Services(this);

    dispatch('listenPlayerControls');

    gameService.start();

    gameService.onServerUpdate(() => {
      this.socketService.emit('player-move', state.mousePosition);
    });
  },

  listenPlayerControls ({ commit, state }) {
    handleEvents.listenEvent('mousemove', ({ x, y }) => {
      const [ mouseX, mouseY ] = state.mousePosition;
      if (mouseX.x !== x || mouseY.y !== y) {
        commit('SET_MOUSE_POSITION', [x, y]);
      }
    });
  },

  initializeSocket({ dispatch, commit }, io) {
    const { socketService } = new Services({ io });
    socketService.listen('connect', () => {
      this.socketService = socketService;
      dispatch('listenPlayersStatistics', socketService);
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
