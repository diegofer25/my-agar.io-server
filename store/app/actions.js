import Services from './../../services';

export default {
  async createRoom() {
    // const { gameService } = new Services(this);
  },

  initializeSocket({ commit, state }, io) {
    const { socketService } = new Services({ io });
    socketService.listen('addPlayerStatistic', (socketId) => {
      if (!state.socketId) {
        commit('SET_SOCKET_ID', socketId);
        commit('SET_STATISTICS', { playersCount: state.statistics.playersCount + 1 });
      } else if (state.socketId !== socketId) {
        commit('SET_STATISTICS', { playersCount: state.statistics.playersCount + 1 });
      }
    });

    socketService.listen('removePlayerStatistic', (socketId) => {
      if (state.socketId === socketId) {
        commit('SET_SOCKET_ID', '');
      }
      commit('SET_STATISTICS', { playersCount: state.statistics.playersCount - 1 });
    });
  }
};
