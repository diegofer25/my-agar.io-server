export default class SocketService {
  constructor({ io, player }) {
    this.socket = io.connect('ws://localhost:5000', {
      transports: ['websocket'],
      query: `name=${player.name}&color=${player.color}`
    });
  }

  listen(event, callback) {
    this.socket.on(event, callback);
  }

  emit(event, payload, callback) {
    this.socket.emit(event, payload, callback);
  }

  get socketId () {
    return this.socket.id;
  }
}
