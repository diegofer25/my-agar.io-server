export default {
  SET_PLAYERS (state, players) {
    state.players = players;
  },

  SET_PLAYER (state, player) {
    state.players = state.players.map(p => {
      if (p.id === state.socketId) return player;
      return p;
    });
  },

  SET_MOUSE_POSITION (state, mousePosition) {
    state.mousePosition = mousePosition;
  },

  SET_CANVAS (state, canvas) {
    state.canvas = canvas;
  },

  SET_SOCKET_ID (state, socketId) {
    state.socketId = socketId;
  },
};
