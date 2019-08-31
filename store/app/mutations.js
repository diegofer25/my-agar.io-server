export default {
  SET_SOCKET_ID (state, socketId) {
    state.socketId = socketId;
  },

  SET_STATISTICS(state, { playersCount, roomsCount }) {
    state.statistics = {
      playersCount: playersCount ? playersCount : state.statistics.playersCount,
      roomsCount: roomsCount ? roomsCount : state.statistics.roomsCount
    };
  }
};
