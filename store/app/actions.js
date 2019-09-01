import Services from './../../services';

export default {
  async createRoom() {
    // const { gameService } = new Services(this);
  },

  async loadStatistics ({ state, commit }) {
    const data = await this.$axios.$get('/api/app/statistics');
    commit('SET_STATISTICS', {
      playersCount: state.statistics.playersCount + data.playersCount,
      roomsCount: state.statistics.roomsCount + data.roomsCount
    });
  },

  initializeSocket({ commit, state }, io) {
    const { socketService } = new Services({ io });
    socketService.listen('addPlayerStatistic', (socketId) => {
      if (!state.socketId) {
        commit('SET_SOCKET_ID', socketId);
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
