export default {
  getPlayer: state => {
    return state.players.find(p => p.id === state.socketId);
  }
};
