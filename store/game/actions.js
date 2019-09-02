import Services from './../../services';

export default {
  startGame({ dispatch, state }, ctx) {
    const gameLoop = setInterval(() => {

      ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
      dispatch('handleMousePosition');

      if (state.game.over) {
        clearInterval(gameLoop);
      }

    }, state.game.loop);
  },

  handleMousePosition ({ state, commit }) {
    const [ mouseX, mouseY ] = state.mousePosition;
    commit('SET_PLAYERS', state.players.map(player => {
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
      return { ...player, position: [x, y] };
    }));
  },

  initializeSocket({ dispatch }, io) {
    const { socketService } = new Services({ io });
    socketService.listen('connect', () => {
      dispatch('listenPlayers', socketService);
      dispatch('listenPlayersStatistics', socketService);
    });
  },

  listenPlayers ({ commit, state }, socketService) {
    socketService.listen('updatePlayers', (players) => {
      if (players.some(p => p.id === socketService.socketId)) {
        commit('SET_SOCKET_ID', players.find(p => p.id === socketService.socketId).id);
      }
      commit('SET_PLAYERS', players);
    });

    socketService.listen('removePlayer', (id) => {
      commit('SET_PLAYERS', state.player.filter(player => player.id !== id));
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
