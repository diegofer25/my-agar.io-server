export default class SocketService {
  constructor({ io }) {
    this.socket = io('ws://localhost:5000', { transports: ['websocket'] });
  }

  listen(event, callback) {
    this.socket.on(event, callback);
  }

  emit(event, payload) {
    this.socket.emit(event, payload);
  }

  get socketId () {
    return this.socket.id;
  }
}
