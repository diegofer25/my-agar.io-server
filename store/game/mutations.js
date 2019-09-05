export default {
  SET_CONNECTED (state, status) {
    state.connected = status;
  },

  SET_MOUSE_POSITION (state, mousePosition) {
    state.mousePosition = mousePosition;
  },

  SET_PLAYERS (state, players) {
    state.players = players;
  },

  SET_SOCKET_ID (state, socketId) {
    state.socketId = socketId;
  }
};
