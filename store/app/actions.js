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

  initializeSocket({ dispatch }, io) {
    const { socketService } = new Services({ io });
    dispatch('listenPlayers', socketService);
  },

  listenPlayers({ commit, state }, socketService) {
    socketService.listen('addPlayerStatistic', (socketId) => {
      if (socketService.socketId !== socketId) {
        commit('SET_STATISTICS', { playersCount: state.statistics.playersCount + 1 });
      } else {
        commit('SET_SOCKET_ID', socketId);
      }
    });

    socketService.listen('removePlayerStatistic', (socketId) => {
      if (socketService.socketId !== socketId) {
        commit('SET_STATISTICS', { playersCount: state.statistics.playersCount - 1 });
      }
    });
  }
};
