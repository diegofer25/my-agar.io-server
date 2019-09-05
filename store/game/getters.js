export default {
  mouseDirection ({ mousePosition }) {
    const center = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };
    const move = {
      x: mousePosition.x > center.x,
      y: mousePosition.y > center.y,
    };

    // var percentX, percentY;
    // if (move.x) {
    //   percentX = 1 - (center.x / mousePosition.x);
    // } else {
    //   percentX = 1 - (mousePosition.x / center.x);
    // }

    // if (move.y) {
    //   percentY = 1 - (center.y / mousePosition.y);
    // } else {
    //   percentY = 1 - (mousePosition.y / center.y);
    // }
    // const percent = percentX < percentY ? percentY : percentX;
    return {
      ...move,
      // percent: percent < 0.3 ? 0.5 : 1
    };
  },

  player (state) {
    return state.players.filter(p => p.id === state.socketId);
  }
};
