import Services from './../../services';

export default {
  startGame({ dispatch, state }, ctx) {
    const gameLoop = setInterval(() => {

      ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
      dispatch('checkMove');

      if (state.game.over) {
        clearInterval(gameLoop);
      }

    }, state.game.loop);
  },

  checkMove ({ state, getters, dispatch }) {
    const player = getters.getPlayer;
    if (player) {
      const [ mouseX, mouseY ] = state.mousePosition;
      const { speed, position, length } = player;
      var [ x, y ] = position;
      if (mouseX - length / 2 > x) {
        x += speed;
      } else if (mouseX + length/2 < x - length) {
        x -= speed;
      }

      if (mouseY - length / 2 > y) {
        y += speed;
      } else if (mouseY + length/2 < y - length) {
        y -= speed;
      }
      dispatch('sendMove', { id: player.id, position: [x, y] });
    }
  },

  sendMove ({ commit, getters }, player) {
    this.socketService.emit('player-move', player, () => {
      commit('SET_PLAYER', { ...getters.getPlayer, position: player.position });
    });
  },

  initializeSocket({ dispatch, commit }, io) {
    const { socketService } = new Services({ io });
    socketService.listen('connect', () => {
      this.socketService = socketService;
      commit('SET_SOCKET_ID', socketService.socketId);
      dispatch('listenPlayers', socketService);
      dispatch('listenPlayersStatistics', socketService);
    });
  },

  listenPlayers ({ commit, state }, socketService) {
    socketService.listen('updatePlayers', (players) => {
      commit('SET_PLAYERS', players);
    });

    socketService.listen('removePlayer', (id) => {
      commit('SET_PLAYERS', state.players.filter(player => player.id !== id));
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
