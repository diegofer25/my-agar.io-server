export default {
  SET_SOCKET_ID (state, socketId) {
    state.socketId = socketId;
    state.statistics.playersCount++;
  },

  SET_STATISTICS(state, { playersCount, roomsCount }) {
    state.statistics.playersCount += playersCount;
    state.statistics.roomsCount += roomsCount;
  }
};
