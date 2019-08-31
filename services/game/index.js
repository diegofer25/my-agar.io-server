export default class GameService {
  constructor({ $axios }) {
    this.$axios = $axios;
  }

  createRoom(room) {
    console.log(this.$axios.$get, room);
    return 'Room Created';
  }
}
